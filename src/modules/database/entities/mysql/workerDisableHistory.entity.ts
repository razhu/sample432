import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { Worker } from './worker.entity';

@Entity('worker_disable_history')
export class WorkerDisableHistory extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true, type: 'int' })
  tenant_id: number;

  @Column({ nullable: true, type: 'int' })
  agency_id: number;

  @Column({ nullable: true, type: 'int' })
  worker_id: number;

  @Column({ default: 1, type: 'tinyint' })
  active: boolean;

  @Column({ type: 'varchar', length: 250 })
  disable_reason: string;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @OneToOne(() => WorkerDisableHistory, (workerDisableHistory) => workerDisableHistory.worker)
  @JoinColumn({ name: 'worker_id', referencedColumnName: 'id' })
  worker: Worker;
}
