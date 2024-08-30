import { Body, Controller, Get, NotFoundException, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppVersionService } from '../services/appversion.service';
import { AppTypeValidationPipe } from 'src/libs/device/pipes/AppTypeValidationPipe';
import { AppType } from 'src/modules/database/entities/mysql';
import { AppVersionUpdateDto } from '../dtos/request.dto';

@ApiTags('Versions')
@Controller('versions')
export class AppVersionController {
  constructor(private service: AppVersionService) {}

  @Get('check')
  @UsePipes(ValidationPipe)
  get(@Query('app_type', AppTypeValidationPipe) appType: AppType) {
    return this.service.getSupportedVersion(appType);
  }

  @Put('update')
  @UsePipes(ValidationPipe)
  async update(@Query('app_type', AppTypeValidationPipe) appType: AppType, @Body() body: AppVersionUpdateDto) {
    //TODO: need to add code here to validate the input and update specific version

    const appRecordCount = await this.service.verifyAppType(appType);

    if (appRecordCount <= 0) {
      throw new NotFoundException(`${appType} does not have nay record to modify.`);
    }

    const result = await this.service.updateAppVersion(appType, body.next_version);

    return {
      at: new Date(),
      result,
    };
  }
}
