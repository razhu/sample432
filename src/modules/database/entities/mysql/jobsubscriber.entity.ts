import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('job_subscribers')
export class JobSubscriber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tenant_id: number;

  @Column()
  agency_id: number;

  @Column()
  order_id: number;

  @Column()
  job_id: number;

  @Column()
  shift_id: number;

  @Column()
  subscriber_email: string;

  @Column({ type: 'datetime', precision: 6 })
  created_at: Date;

  @Column({ type: 'datetime', precision: 6 })
  updated_at: Date;
}
