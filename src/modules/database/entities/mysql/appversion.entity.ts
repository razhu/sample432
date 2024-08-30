import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum AppType {
  ANDROID = 'ANDROID',
  IOS = 'IOS',
  WEB = 'WEB',
  CLIENT_ANDROID = 'CLIENT_ANDROID',
  CLIENT_IOS = 'CLIENT_IOS',
}

@Entity('app_versions')
export class AppVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: AppType })
  app_type: AppType;

  @Column({ type: 'varchar', length: 12 })
  min_supported_version: string;
}
