import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppType, AppVersion } from '../../database/entities/mysql';

@Injectable()
export class AppVersionService {
  constructor(@InjectRepository(AppVersion) private appVersionRepository: Repository<AppVersion>) {}

  async getSupportedVersion(appType: AppType): Promise<AppVersion[]> {
    return this.appVersionRepository.find({
      where: [{ app_type: appType }],
    });
  }

  async verifyAppType(appType: AppType): Promise<number> {
    return this.appVersionRepository.count({
      where: [{ app_type: appType }],
    });
  }

  async updateAppVersion(appType: AppType, next_version: string): Promise<AppVersion> {
    // Find the AppVersion entity by type
    const appVersionToUpdate: AppVersion | undefined = await this.appVersionRepository.findOneBy({
      app_type: appType,
    });

    if (appVersionToUpdate) {
      // Update the min_supported_version property
      appVersionToUpdate.min_supported_version = next_version;

      // Save the updated entity back to the database
      await this.appVersionRepository.save(appVersionToUpdate);

      // Optionally, return the updated entity
      return appVersionToUpdate;
    } else {
      throw new Error(`AppVersion not found`);
    }
  }
}
