import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class Order {
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

  @Column({ type: 'varchar', length: 16, nullable: true })
  uuid: string;

  @Column({ type: 'int', default: 0 })
  jobs_count: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  status: string;

  @Column({ type: 'datetime' })
  start_at: Date;

  @Column({ type: 'datetime' })
  end_at: Date;

  @Column({ type: 'datetime', precision: 6 })
  created_at: Date;

  @Column({ type: 'datetime', precision: 6 })
  updated_at: Date;

  @Column({ type: 'datetime', nullable: true })
  cancelled_at: Date;
}
