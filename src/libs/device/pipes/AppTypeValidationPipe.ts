import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { AppType } from 'src/modules/database/entities/mysql';

@Injectable()
export class AppTypeValidationPipe implements PipeTransform {
  transform(value: unknown) {
    if (!this.isAppType(value)) {
      throw new BadRequestException(`Invalid app_type. Supported values are: ${Object.values(AppType).join(', ')}`);
    }
    return value as AppType;
  }

  private isAppType(value: unknown): boolean {
    return Object.values(AppType).includes(value as AppType);
  }
}
