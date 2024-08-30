import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { S3Service } from './s3.service';
import { S3BucketPrefixes, S3DownloadType } from '../types';
import { BadRequestException } from '@nestjs/common';
import sharp from 'sharp';

jest.mock('@aws-sdk/client-s3');
jest.mock('sharp');

describe('S3Service', () => {
  let service: S3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        S3Service,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key) => {
              if (key === 'AWS_S3_BUCKET') return 'test-bucket';
              if (key === 'AWS_S3_CDN_BUCKET') return 'test-cdn-bucket';
              if (key === 'AWS_ACCESS_KEY_ID') return 'testAccessKey';
              if (key === 'AWS_SECRET_ACCESS_KEY') return 'testSecretKey';
              else return '';
            }),
          },
        },
      ],
    }).compile();

    service = module.get<S3Service>(S3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getBucketPublicUrl', () => {
    it('should return the public URL of the S3 bucket', () => {
      expect(service.getBucketPublicUrl()).toEqual('https://test-bucket.s3.amazonaws.com');
    });
  });

  describe('getAvatarBucketUrl', () => {
    it('should return the avatar bucket URL', () => {
      const key = 'avatar.jpg';
      expect(service.getAvatarBucketUrl(key)).toEqual('https://test-bucket.s3.amazonaws.com/avatar.jpg');
    });

    it('should return null if key is not provided', () => {
      expect(service.getAvatarBucketUrl('')).toBeNull();
    });
  });

  describe('uploadFile', () => {
    it('should upload a file to S3 and return the file key', async () => {
      const s3ClientSendMock = jest.fn().mockResolvedValue({});
      S3Client.prototype.send = s3ClientSendMock;

      const key = 'file.jpg';
      const prefix = S3BucketPrefixes.AVATAR_BUCKET;
      const file = Buffer.from('file data');
      const result = await service.uploadFile(key, prefix, file);

      expect(s3ClientSendMock).toHaveBeenCalledWith(expect.any(PutObjectCommand));
      expect(result).toEqual(`${prefix}/${key}`);
    });

    // Add more tests here to cover different scenarios, including error handling
  });

  describe('downloadFile', () => {
    it('should download a file from S3 as a byte array', async () => {
      const expectedByteArray = Uint8Array.from([1, 2, 3, 4]);
      const s3ClientSendMock = jest.fn().mockResolvedValue({
        Body: {
          transformToByteArray: jest.fn().mockResolvedValue(expectedByteArray),
        },
      });
      S3Client.prototype.send = s3ClientSendMock;

      const key = 'file.jpg';
      const prefix = S3BucketPrefixes.AVATAR_BUCKET;
      const result = await service.downloadFile(key, prefix, S3DownloadType.BYTE_ARRAY);

      expect(s3ClientSendMock).toHaveBeenCalledWith(expect.any(GetObjectCommand));
      expect(result).toEqual(expectedByteArray);
    });

    it('should download a file from S3 as a string', async () => {
      const expectedString = 'file contents';
      const s3ClientSendMock = jest.fn().mockResolvedValue({
        Body: {
          transformToString: jest.fn().mockResolvedValue(expectedString),
        },
      });
      S3Client.prototype.send = s3ClientSendMock;

      const key = 'file.txt';
      const prefix = S3BucketPrefixes.CUSTOMER_DOCUMENTS_BUCKET;
      const result = await service.downloadFile(key, prefix, S3DownloadType.STRING);

      expect(s3ClientSendMock).toHaveBeenCalledWith(expect.any(GetObjectCommand));
      expect(result).toEqual(expectedString);
    });

    it('should throw an error for unsupported file type', async () => {
      const key = 'file.unknown';
      const prefix = S3BucketPrefixes.CUSTOMER_DOCUMENTS_BUCKET;

      await expect(service.downloadFile(key, prefix, 'unsupported' as S3DownloadType)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('generateThumbnail', () => {
    it.skip('should generate a thumbnail', async () => {
      const avatar = Buffer.from('avatar');
      const thumbnail = await service.generateThumbnail(avatar);

      expect(sharp).toHaveBeenCalledWith(avatar);
      expect(sharp().resize).toHaveBeenCalledWith({
        width: 200,
        height: 200,
        fit: 'cover',
      });
      expect(sharp().jpeg).toHaveBeenCalled();
      expect(sharp().withMetadata).toHaveBeenCalled();
      expect(thumbnail).toBeInstanceOf(Object);
    });
  });
});
