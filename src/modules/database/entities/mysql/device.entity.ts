import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('devices')
export class Device {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'int', nullable: true })
  actor_id: number;

  @Column({ type: 'int', nullable: true })
  actor_parent_id: number;

  @Column({ type: 'int', nullable: true })
  user_id: number;

  @Column({ type: 'varchar', length: 32, nullable: true })
  actor_type: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  uuid: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  refresh_token: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  fcm_token: string;

  @Column({ type: 'tinyint', default: 1 })
  notifications_status: boolean;

  @Column({ type: 'varchar', length: 32, nullable: true })
  last_issued: string;

  @Column({ type: 'datetime', precision: 6 })
  last_issued_at: Date;

  @Column({ type: 'datetime', precision: 6 })
  last_activity_at: string;

  @Column({ type: 'int', nullable: false })
  expires_at: Date;

  @Column({ type: 'varchar', length: 16, nullable: true })
  client: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  client_version: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  user_agent: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  ip: string;

  @Column({ type: 'datetime', precision: 6 })
  created_at: Date;

  @Column({ type: 'datetime', precision: 6 })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.devices)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
