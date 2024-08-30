import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Job } from './job.entity';
import { Worker } from './worker.entity';

@Entity('job_workers')
export class JobWorker {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'int', nullable: true })
  order_id: number;

  @Column({ type: 'int', nullable: true })
  job_id: number;

  @Column({ type: 'int', nullable: true })
  worker_id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  check_workplace_id: string;

  @Column({ type: 'int', nullable: true })
  rate_id: number;

  @Column({ type: 'int', default: 0 })
  cost_rate: number;

  @Column({ type: 'int', default: 0 })
  pay_rate: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  status: string;

  @Column({ type: 'tinyint', default: 0, nullable: false })
  showed: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  drop_reason: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  dismiss_reason: string;

  @Column({ type: 'datetime' })
  dropped_at: Date;

  @Column({ type: 'datetime' })
  dismissed_at: Date;

  @Column({ type: 'int', default: 0 })
  dismissed_by_user_id: number;

  @Column({ type: 'datetime', precision: 6 })
  created_at: Date;

  @Column({ type: 'datetime', precision: 6 })
  updated_at: Date;

  @ManyToOne(() => Job, (job) => job.workers)
  @JoinColumn({ name: 'job_id', referencedColumnName: 'id' })
  job: Job;

  @ManyToOne(() => Worker, (worker) => worker.job_worker)
  @JoinColumn({ name: 'worker_id', referencedColumnName: 'id' })
  worker: Worker;
}
