export enum Role {
  Guest = 'guest',
  Worker = 'worker',
  ClientAdmin = 'clientadmin',
  TenantAdmin = 'tenantadmin',
}

export enum EUserStatus {
  Active = 'active',
  Disabled = 'disabled',
}

export enum PlatformAccessStatus {
  WEB_APPROVED = 1 << 0, // 1
  WEB_REQUESTED = 1 << 1, // 2
  APP_APPROVED = 1 << 2, // 4
  APP_REQUESTED = 1 << 3, // 8
}
