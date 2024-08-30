import { Account } from './account.entity';
import { AppVersion } from './appversion.entity';
import { Job } from './job.entity';
import { JobSubscriber } from './jobsubscriber.entity';
import { Order } from './order.entity';
import { Prompt } from './prompt.entity';
import { Shift } from './shift.entity';
import { User } from './user.entity';
import { ChatGroup } from './chatgroup.entity';
import { ChatGroupJob } from './chatgroupjob.entity';
import { ChatGroupUser } from './chatgroupuser.entity';
import { JobWorker } from './jobworker.entity';
import { Worker } from './worker.entity';
import { WorkerDisableHistory } from './workerDisableHistory.entity';
import { Customer } from './customer.entity';
import { Request } from './request.entity';
import { Device } from './device.entity';
import { CustomerAdmin } from './customeradmin.entity';
import { WorkerSkill } from './workerSkill.entity';
import { ZipcodeData } from './zipcodeData.entity';
import { ChatGroupSkill } from './chatGroupSkill.entity';
import { TenantAdmin } from './tenantadmin.entity';
import { Invoice } from './invoice.entity';
import { RegionZipcode } from './region_zipcodes.entity';
import { Region } from './region.entity';
import { Payroll } from './payroll.entity';
import { PayrollItems } from './payrollitems.entity';
import { Address } from './address.entity';
import { Rates } from './rates.entity';
import { SkillCategory } from './skillcategory.entity';

export * from './account.entity';
export * from './appversion.entity';
export * from './chatgroup.entity';
export * from './chatgroupjob.entity';
export * from './chatgroupuser.entity';
export * from './job.entity';
export * from './jobsubscriber.entity';
export * from './jobworker.entity';
export * from './order.entity';
export * from './prompt.entity';
export * from './shift.entity';
export * from './user.entity';
export * from './worker.entity';
export * from './workerDisableHistory.entity';
export * from './customer.entity';
export * from './request.entity';
export * from './device.entity';
export * from './customeradmin.entity';
export * from './workerSkill.entity';
export * from './zipcodeData.entity';
export * from './chatGroupSkill.entity';
export * from './tenantadmin.entity';
export * from './invoice.entity';
export * from './region.entity';
export * from './region_zipcodes.entity';
export * from './address.entity';
export * from './rates.entity';
export * from './skillcategory.entity';

export default [
  Account,
  AppVersion,
  ChatGroup,
  ChatGroupJob,
  ChatGroupUser,
  Job,
  JobSubscriber,
  JobWorker,
  Order,
  Prompt,
  Shift,
  User,
  Worker,
  WorkerDisableHistory,
  Customer,
  Request,
  Device,
  CustomerAdmin,
  WorkerSkill,
  ZipcodeData,
  ChatGroupSkill,
  TenantAdmin,
  Invoice,
  Region,
  RegionZipcode,
  Payroll,
  PayrollItems,
  Address,
  Rates,
  SkillCategory,
];
