import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('customer_admins')
@Unique(['invite_code']) // Adding unique constraint for 'invite_code' column
export class CustomerAdmin {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'int', nullable: true, name: 'tenant_id' })
  tenant_id: number;

  @Column({ type: 'int', nullable: true, name: 'agency_id' })
  agency_id: number;

  @Column({ type: 'int', nullable: true, name: 'customer_id' })
  customer_id: number;

  @Column({ type: 'int', nullable: true, name: 'user_id' })
  user_id: number;

  @Column({ type: 'int', default: 0 })
  role: number;

  @Column({ type: 'varchar', length: 64, nullable: true, name: 'chat_uid' })
  chat_uid: string;

  @Column({ type: 'varchar', length: 120, nullable: true, name: 'current_payment_method' })
  current_payment_method: string;

  @Column({ type: 'varchar', length: 100, name: 'invite_code' })
  invite_code: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'title' })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'referral' })
  referral: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'avatar_key' })
  avatar_key: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  avatar_original_key: string;

  @Column({ type: 'datetime', nullable: true, name: 'accepted_at' })
  accepted_at: Date;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updated_at: Date;

  @Column({ default: 1, type: 'tinyint' })
  active: boolean;

  @OneToOne(() => User, (user) => user.customerAdmin)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
