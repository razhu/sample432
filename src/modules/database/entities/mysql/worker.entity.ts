import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Point,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { JobWorker } from './jobworker.entity';
import { WorkerSkill } from './workerSkill.entity';
import { PayrollItems } from './payrollitems.entity';

@Entity('workers')
export class Worker {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true, type: 'int' })
  tenant_id: number;

  @Column({ nullable: true, type: 'int' })
  agency_id: number;

  @Column({ nullable: true, type: 'int' })
  user_id: number;

  @Column({ default: 1, type: 'tinyint' })
  active: boolean;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  deactivated_by: string;

  @Column({ nullable: true, type: 'bigint' })
  deactivated_by_user_id: number;

  @Column({ nullable: true, type: 'datetime' })
  deactivated_at: Date;

  @Column({ type: 'varchar', default: 'unverified', length: 32 })
  candidate_status: string;

  @Column({ nullable: true, type: 'datetime' })
  candidate_status_updated_at: Date;

  @Column({ nullable: true, type: 'datetime' })
  approved_at: Date;

  @Column({ nullable: true, type: 'datetime' })
  denied_at: Date;

  @Column({ nullable: true, type: 'datetime' })
  quiz_completed_at: Date;

  @Column({ type: 'varchar', nullable: true, length: 128 })
  payroll_id: string;

  @Column({ type: 'varchar', nullable: true, length: 64 })
  chat_uid: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  support_chat_gid: string;

  @Column({ type: 'varchar', nullable: true, length: 1 })
  gender: string;

  @Column({ type: 'varchar', nullable: true, length: 32 })
  background_id: string;

  @Column({ type: 'varchar', nullable: true, length: 16 })
  background_status: string;

  @Column({ nullable: true, type: 'int' })
  compliance_id: number;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  onboarding_status: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  interview_status: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  i9_status: string;

  @Column({ nullable: true, type: 'int' })
  i9form_id: number;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  onboarding_docs_status: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  paylocity_username: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  check_employee_id: string;

  @Column({ type: 'varchar', nullable: true, length: 128 })
  address_line1: string;

  @Column({ type: 'varchar', nullable: true, length: 128 })
  address_line2: string;

  @Column({ type: 'varchar', nullable: true, length: 32 })
  city: string;

  @Column({ type: 'varchar', nullable: true, length: 2 })
  state: string;

  @Column({ type: 'varchar', nullable: true, length: 16 })
  zip: string;

  @Column({ type: 'point', spatialFeatureType: 'Point', srid: 4326 })
  coords: Point;

  @Column({ type: 'varchar', length: 96 })
  timezone: string;

  @Column({ type: 'varchar', length: 16 })
  verification_code: string;

  @Column({ nullable: true, type: 'datetime' })
  verified_at: Date;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  heard_from: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  avatar_key: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  avatar_original_key: string;

  @Column({ default: 0, type: 'tinyint' })
  owns_car: boolean;

  @Column({ default: 1, type: 'tinyint' })
  us_citizen_or_work_permit: boolean;

  @Column({ default: 0, type: 'tinyint' })
  has_ssn: boolean;

  @Column({ type: 'varchar', default: 'w2', length: 255 })
  tax_type: string;

  @Column({ nullable: true, type: 'datetime' })
  tc_accepted_at: Date;

  @Column({ default: 0, type: 'int' })
  jobs_worked: number;

  @Column({ default: 0, type: 'int' })
  jobs_dropped: number;

  @Column({ default: 0, type: 'int' })
  jobs_failed: number;

  @CreateDateColumn({ type: 'datetime', precision: 6 })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', precision: 6 })
  updated_at: Date;

  @Column({ nullable: true, type: 'datetime' })
  reenable_date: Date;

  @Column({ type: 'varchar', length: 250 })
  disable_reason: string;

  @Column({ default: 0, type: 'int' })
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  average_rating: number;

  @Column({ default: 0, type: 'int' })
  jobs_rating_count: number;

  @Column({ nullable: true, type: 'int' })
  last_confirmation_sms_job_id: number;

  @Column({ type: 'varchar', length: 250 })
  check_workplace_id: number;

  @Column({ default: 0, type: 'tinyint' })
  no_show: boolean;

  @Column({ default: 0, type: 'tinyint' })
  address_changed: boolean;

  @OneToOne(() => User, (user) => user.worker)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => JobWorker, (job_worker) => job_worker.worker)
  @JoinColumn({ name: 'id', referencedColumnName: 'worker_id' })
  job_worker: JobWorker[];

  @OneToMany(() => WorkerSkill, (worker_skill) => worker_skill.worker)
  @JoinColumn({ name: 'id', referencedColumnName: 'worker_id' })
  worker_skill: WorkerSkill[];

  @OneToMany(() => PayrollItems, (payroll) => payroll.worker)
  @JoinColumn({ name: 'check_employee_id', referencedColumnName: 'check_employee_id' })
  payroll_items: PayrollItems[];
}
