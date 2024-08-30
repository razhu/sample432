// src/middlewares/device-type.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { AppType } from 'src/modules/database/entities/mysql';
import { GravyRequest } from 'src/modules/general/types';

@Injectable()
export class DeviceDetectionMiddleware implements NestMiddleware {
  use(req: GravyRequest, res: Response, next: NextFunction) {
    const userAgent = req.headers['user-agent']?.toLowerCase() || '';

    const currentVersion = req.headers['X-APP-VERSION']?.toString() || '1.0.0';

    req.currentVersion = currentVersion;

    let appType: AppType;
    if (userAgent.includes('android')) {
      appType = AppType.ANDROID;
    } else if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod')) {
      appType = AppType.IOS;
    } else {
      appType = AppType.WEB;
    }

    // Add the appType to the request object for later use in the controller
    req.appType = appType;

    next();
  }
}
