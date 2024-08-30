import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinColumn,
  OneToOne,
  JoinTable,
} from 'typeorm';
import { ChatGroup } from './chatgroup.entity';
import { ChatGroupUser } from './chatgroupuser.entity';
import { Worker } from './worker.entity';
import { Role } from './role.entity';
import { Device } from './device.entity';
import { TenantAdmin } from './tenantadmin.entity';
import { CustomerAdmin } from './customeradmin.entity';
import { GravyWorkUserType } from '../../../general/types';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true, name: 'first_name' })
  firstName: string;

  @Column({ nullable: true, name: 'middle_name' })
  middleName: string;

  @Column({ nullable: true, name: 'last_name' })
  lastName: string;

  @Column({ nullable: true, name: 'date_of_birth' })
  dateOfBirth: Date;

  @Column({ length: 2, default: 'en' })
  language: string;

  @Column({ nullable: true, name: 'secondary_language' })
  secondaryLanguage: string;

  @Column({ nullable: true })
  role: string;

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: true, name: 'phone_number' })
  phoneNumber: string;

  @Column({ nullable: true, name: 'smartphone_type' })
  smartphoneType: string;

  @Column({ nullable: true, name: 'password_digest' })
  passwordDigest: string;

  @Column({ nullable: true, name: 'password_reset_token' })
  passwordResetToken: string;

  @Column({ default: false, name: 'email_confirmed' })
  emailConfirmed: boolean;

  @Column({ nullable: true })
  otp: string;

  @Column({ nullable: true, name: 'otp_at' })
  otpAt: string;

  @Column({ nullable: true, name: 'otp_type' })
  otpType: string;

  @Column({ default: false, name: 'password_stale' })
  passwordStale: boolean;

  @Column({ nullable: true, name: 'reset_password' })
  resetPassword: boolean;

  @Column({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'int', name: 'allowed_platform' })
  allowedPlatform: number;

  @Column({ type: 'char', length: '36', name: 'channel_id' })
  channelId: string;

  @ManyToMany(() => ChatGroup, (chatGroups) => chatGroups.users)
  chatGroups: ChatGroup[];

  @OneToMany(() => ChatGroupUser, (chatGroupUser) => chatGroupUser.user)
  @JoinColumn({ name: 'id', referencedColumnName: 'user_id' })
  chatGroupUser: ChatGroupUser[];

  @OneToOne(() => Worker, (worker) => worker.user)
  @JoinColumn({ name: 'id', referencedColumnName: 'user_id' })
  worker: Worker;

  @OneToOne(() => TenantAdmin, (tenantAdmin) => tenantAdmin.user)
  @JoinColumn({ name: 'id', referencedColumnName: 'user_id' })
  tenantAdmin: TenantAdmin;

  @OneToMany(() => Device, (device) => device.user)
  @JoinColumn({ name: 'id', referencedColumnName: 'user_id' })
  devices: Device[];

  @ManyToMany(() => Role, { cascade: true })
  @JoinTable()
  roles: Role[];

  @OneToMany(() => ChatGroup, (chat_group) => chat_group.last_message_sender)
  @JoinColumn({ name: 'id', referencedColumnName: 'last_message_sender_id' })
  lastMessage: ChatGroup[];

  @OneToOne(() => CustomerAdmin, (customerAdmin) => customerAdmin.user)
  @JoinColumn({ name: 'id', referencedColumnName: 'user_id' })
  customerAdmin: CustomerAdmin;

  getUserType(): GravyWorkUserType {
    return this.worker?.id
      ? GravyWorkUserType.WORKER
      : this.tenantAdmin?.id
      ? GravyWorkUserType.TENANT_ADMIN
      : this.customerAdmin?.id
      ? GravyWorkUserType.CUSTOMER_ADMIN
      : null;
  }
}
