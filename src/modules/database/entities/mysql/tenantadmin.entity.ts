import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('tenant_admins')
export class TenantAdmin {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true, type: 'int' })
  tenant_id: number;

  @Column({ nullable: true, type: 'int' })
  user_id: number;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  chat_uid: string;

  @Column({ default: 1, type: 'int' })
  role: number;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  avatar_key: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  avatar_original_key: string;

  @Column({ nullable: true, type: 'datetime' })
  accepted_at: Date;

  @CreateDateColumn({ type: 'datetime', precision: 6 })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', precision: 6 })
  updated_at: Date;

  @OneToOne(() => User, (user) => user.tenantAdmin)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
