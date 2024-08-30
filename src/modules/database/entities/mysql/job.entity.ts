import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, JoinColumn } from 'typeorm';
import { ChatGroup } from './chatgroup.entity';
import { JobWorker } from './jobworker.entity';
import { Timesheet } from './timesheet.entity';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'int', nullable: true })
  tenant_id: number;

  @Column({ type: 'int', nullable: true })
  agency_id: number;

  @Column({ type: 'int', nullable: true })
  customer_id: number;

  @Column({ type: 'int', nullable: true })
  account_id: number;

  @Column({ type: 'int', nullable: true })
  contact_id: number;

  @Column({ type: 'int', nullable: true })
  order_id: number;

  @Column({ type: 'int', nullable: true })
  address_id: number;

  @Column({ type: 'int', nullable: true })
  rate_id: number;

  @Column({ type: 'int', nullable: true })
  skill_id: number;

  @Column({ type: 'int', nullable: true })
  uniform_id: number;

  @Column({ type: 'int', nullable: true })
  user_cancel_id: number;

  @Column({ type: 'varchar', length: 16, nullable: true })
  chat_gid: string;

  @Column({ type: 'int', default: 0 })
  group_id: number;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column({ type: 'int', default: 0 })
  hired_workers_count: number;

  @Column({ type: 'int', default: 0 })
  same_worker_all_shifts: number;

  @Column({ type: 'int', default: 0 })
  cost_rate: number;

  @Column({ type: 'int', default: 0 })
  pay_rate: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  tax_type: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  approval_status: string;

  @Column({ type: 'int', default: 0 })
  shifts_count: number;

  @Column({ type: 'datetime' })
  first_shift_start_at: Date;

  @Column({ type: 'datetime' })
  last_shift_end_at: Date;

  @Column({ type: 'varchar', length: 700, nullable: true })
  instructions: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  address_instructions: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  contact_instructions: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  uniform_instructions: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  reason: string;

  @Column({ type: 'tinyint', default: 0 })
  auto_accept_requests: boolean;

  @Column({ type: 'datetime', nullable: true })
  posted_at: Date;

  @Column({ type: 'datetime', nullable: true })
  cancelled_at: Date;

  @Column({ type: 'datetime', precision: 6 })
  created_at: Date;

  @Column({ type: 'datetime', precision: 6 })
  updated_at: Date;

  @Column({ type: 'tinyint', default: 0 })
  is_holiday: boolean;

  @Column({ type: 'int', default: 0 })
  original_pay_rate: number;

  @Column({ type: 'int', default: 0 })
  original_cost_rate: number;

  @Column({ type: 'int', default: 0 })
  job_status: number;

  @Column({ type: 'datetime', precision: 6 })
  job_hold_on: Date;

  @Column({ type: 'int', default: 0 })
  job_hold_by: number;

  @ManyToMany(() => ChatGroup, (chat_group) => chat_group.jobs)
  chat_groups: ChatGroup[];

  @OneToMany(() => JobWorker, (job_worker) => job_worker.job)
  @JoinColumn({ name: 'id', referencedColumnName: 'job_id' })
  workers: JobWorker[];

  @OneToMany(() => Timesheet, (timesheet) => timesheet.job)
  @JoinColumn({ name: 'id', referencedColumnName: 'job_id' })
  timesheets: Timesheet[];
}
