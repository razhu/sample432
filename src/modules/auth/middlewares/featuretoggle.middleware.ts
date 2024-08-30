import { GrowthBook } from '@growthbook/growthbook';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { GravyRequest } from 'src/modules/general/types';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

@Injectable()
export class FeatureToggleMiddleware implements NestMiddleware {
  use(req: GravyRequest, res: Response, next: NextFunction) {
    req.featureFlag = new GrowthBook({
      apiHost: configService.get('GROWTHBOOK_HOST'),
      clientKey: configService.get('GROWTHBOOK_KEY'),
      enableDevMode: true,
    });

    res.on('close', () => req.featureFlag.destroy());

    req.featureFlag
      .loadFeatures({ timeout: 1000 })
      .then(() => {
        next();
      })
      .catch((e) => {
        console.error('Failed to load features from GrowthBook', e);
        throw e;
      });
  }
}
