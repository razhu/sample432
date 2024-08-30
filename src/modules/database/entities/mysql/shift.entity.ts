import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shifts')
export class Shift {
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
  start_at: Date;

  @Column()
  end_at: Date;

  @Column({ type: 'datetime', precision: 6 })
  created_at: Date;

  @Column({ type: 'datetime', precision: 6 })
  updated_at: Date;
}
