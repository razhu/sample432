import { Request } from 'express';
import { GrowthBook } from '@growthbook/growthbook';

/** Cross-Module Imports **/
import { AppType, User } from 'src/modules/database/entities/mysql';

export interface GravyRequest extends Request {
  user: User;
  featureFlag: GrowthBook;
  appType: AppType;
  currentVersion: string;
}
