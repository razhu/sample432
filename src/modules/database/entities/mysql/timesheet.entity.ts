import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { PayrollItemEarning } from './payrollitemearning.entity';
import { Job } from './job.entity';

@Entity('timesheets')
export class Timesheet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tenant_id: number;

  @Column()
  agency_id: number;

  @Column()
  customer_id: number;

  @Column()
  account_id: number;

  @Column()
  order_id: number;

  @Column()
  job_id: number;

  @Column()
  shift_id: number;

  @Column()
  job_worker_id: number;

  @Column()
  payroll_id: string;

  @Column()
  checkin_at: Date;

  @Column()
  checkin_coords: string;

  @Column()
  checkout_at: Date;

  @Column()
  checkout_coords: string;

  @Column()
  reported_checkin_at: Date;

  @Column()
  reported_checkout_at: Date;

  @Column()
  reported_break_minutes: number;

  @Column()
  report_comment: string;

  @Column()
  approved_checkin_at: Date;

  @Column()
  approved_checkout_at: Date;

  @Column()
  approved_minutes: number;

  @Column()
  overtime_minutes: number;

  @Column()
  monday_minutes: number;

  @Column()
  approved_break_minutes: number;

  @Column()
  rating: number;

  @Column()
  rating_comment: string;

  @Column()
  tip_amount: number;

  @Column()
  cost_rate: number;

  @Column()
  pay_rate: number;

  @Column()
  pay_overtime: number;

  @Column()
  invoiced: number;

  @Column()
  stripe_invoice_item_id: string;

  @Column()
  previous_week: number;

  @Column()
  updated_by_id: number;

  @Column()
  updated_by_type: string;

  @Column({ nullable: true })
  approved_at: Date;

  @Column({ nullable: true })
  rejected_at: Date;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column({ nullable: true })
  hold_by_invoice_id: number;

  @OneToMany(() => PayrollItemEarning, (payrollItemEarnings) => payrollItemEarnings.timesheet)
  @JoinColumn({ name: 'id', referencedColumnName: 'timesheet_id' })
  payroll_item_earnings: PayrollItemEarning[];

  @ManyToOne(() => Job, (job) => job.timesheets)
  @JoinColumn({ name: 'job_id', referencedColumnName: 'id' })
  job: Job;
}
