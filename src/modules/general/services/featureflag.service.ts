import { Injectable } from '@nestjs/common';

import { GrowthBook } from '@growthbook/growthbook';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

@Injectable()
export class FeatureFlagService {
  private static flags: GrowthBook;

  static initialize(resetCache: boolean = false) {
    try {
      if (!FeatureFlagService.flags || resetCache) {
        FeatureFlagService.flags = new GrowthBook({
          apiHost: configService.get('GROWTHBOOK_HOST'),
          clientKey: configService.get('GROWTHBOOK_KEY'),
          enableDevMode: true,
        });

        FeatureFlagService.flags
          .loadFeatures()
          .then(() => {
            console.info('features loaded');
          })
          .catch((e) => {
            console.error('Failed to load features from GrowthBook', e);
          });
      } else {
        console.debug('feature flag already initialized');
      }
    } catch (error) {
      console.error('FeatureFlag Service failed to initialize', error);
    }
  }

  static isOn(flagKey: string) {
    if (FeatureFlagService.flags) {
      return FeatureFlagService.flags.isOn(flagKey);
    }

    return false;
  }
}
