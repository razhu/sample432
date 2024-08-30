import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, GetObjectCommand, PutObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import { S3BucketPrefixes, S3DownloadType } from '../types';

@Injectable()
export class S3Service {
  public S3_BUCKET = '';
  public S3_CDN_BUCKET = '';
  private client: S3Client;
  private readonly logger = new Logger(S3Service.name);

  constructor(private readonly configService: ConfigService) {
    this.S3_BUCKET = this.configService.get('AWS_S3_BUCKET');
    this.S3_CDN_BUCKET = this.configService.get('AWS_S3_CDN_BUCKET');
    this.client = new S3Client({
      region: 'us-east-1',
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  // write a function that returns the s3 bucket public url
  getBucketPublicUrl() {
    return `https://${this.S3_BUCKET}.s3.amazonaws.com`;
  }

  getAvatarBucketUrl(key: string) {
    return key ? `${this.getBucketPublicUrl()}/${key}` : null;
  }

  getCdnBucketPublicUrl() {
    return `https://${this.S3_CDN_BUCKET}.s3.amazonaws.com`;
  }

  getSkillsBucketUrl(key: string) {
    return key ? `${this.getCdnBucketPublicUrl()}/${key}` : null;
  }

  generateThumbnail(avatar: Uint8Array | string): Promise<Buffer> {
    try {
      return sharp(avatar)
        .resize({
          width: 200,
          height: 200,
          fit: 'cover',
        })
        .jpeg()
        .withMetadata()
        .toBuffer();
    } catch (error) {
      this.logger.error('Failed to generate thumbnail', error);
      throw new InternalServerErrorException('general.S3_GENERATE_THUMBNAIL_FAILED');
    }
  }

  async uploadFile(key: string, prefix: S3BucketPrefixes, file: Uint8Array | string | Buffer): Promise<string> {
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.S3_BUCKET,
        Key: `${prefix}/${key}`,
        Body: file,
        ContentType: 'image/jpeg',
        ACL: ObjectCannedACL.public_read,
      }),
    );
    return `${prefix}/${key}`;
  }

  async downloadFile(
    key: string,
    prefix: S3BucketPrefixes,
    type: S3DownloadType = S3DownloadType.BYTE_ARRAY,
  ): Promise<Uint8Array | string> {
    const body = (
      await this.client.send(
        new GetObjectCommand({
          Bucket: this.S3_BUCKET,
          Key: `${prefix}/${key}`,
        }),
      )
    ).Body;

    switch (type) {
      case S3DownloadType.BYTE_ARRAY:
        return body.transformToByteArray();
      case S3DownloadType.STRING:
        return body.transformToString();
      default:
        this.logger.error('Unsupported type provided for file download', {
          prefix,
          key,
        });
        throw new BadRequestException('general.S3_UNSUPPORTED_FILETYPE');
    }
  }
}
