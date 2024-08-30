import { BadRequestException, Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CheckoutDTO } from '../dtos/checkout.dto';
import { GenerateThumbnailDto } from '../dtos/request.dto';
import { GeneralService, S3Service } from '../services';
import { GravyWorkUserType, S3BucketPrefixes } from '../types';
import { CheckoutDataValidationPipe } from '../../../libs/device/pipes/CheckoutDataValidationPipe';

@ApiTags('System')
@Controller('system')
export class SystemController {
  constructor(
    private readonly generalService: GeneralService,
    private readonly s3Service: S3Service,
  ) {}

  @Post('generate-thumbnail')
  @ApiOperation({ summary: 'Generates the thumbnail of 200x200 for provided image' })
  async generateThumbnail(@Body() body: GenerateThumbnailDto) {
    const file = await this.s3Service.downloadFile(body.avatarKey, S3BucketPrefixes.AVATAR_BUCKET);
    const thumbnail = await this.s3Service.generateThumbnail(file);
    const fileName = await this.s3Service.uploadFile(
      body.avatarKey,
      S3BucketPrefixes.AVATAR_THUMBNAILS_BUCKET,
      thumbnail,
    );
    if (fileName) {
      switch (body.userType) {
        case GravyWorkUserType.WORKER:
          this.generalService.updateWorkerProfileImage(body.id, fileName, body.avatarKey);
          break;
        case GravyWorkUserType.CUSTOMER_ADMIN:
          this.generalService.updateCustomerAdminProfileImage(body.id, fileName, body.avatarKey);
          break;
        case GravyWorkUserType.TENANT_ADMIN:
          this.generalService.updateTenantAdminProfileImage(body.id, fileName, body.avatarKey);
          break;
        default:
          throw new BadRequestException('general.GUEST_INVALID_USER_TYPE');
      }
    }
  }

  @Post('validate/checkout-time')
  @UsePipes(new CheckoutDataValidationPipe())
  async calculateCheckoutTime(@Body() body: CheckoutDTO) {
    const result = this.generalService.handleShift(body.shiftStart, body.shiftEnd, body.userStart, body.userEnd);
    
    return {
      data: result,
      message: 'Success',
    };
  }
}
