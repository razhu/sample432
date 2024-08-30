import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Region } from './region.entity';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'tenant_id', type: 'int', nullable: true })
  tenantId: number;

  @Column({ name: 'agency_id', type: 'int', nullable: true })
  agencyId: number;

  @Column({ name: 'customer_id', type: 'int', nullable: true })
  customerId: number;

  @Column({ name: 'default', type: 'tinyint', default: 0 })
  default: boolean;

  @Column({ name: 'default_contact_id', type: 'int', nullable: true })
  defaultContactId: number;

  @Column({ name: 'name', type: 'varchar', length: 96, nullable: true })
  name: string;

  @Column({ name: 'phone_number', type: 'varchar', length: 16, nullable: true })
  phoneNumber: string;

  @Column({ name: 'stripe_id', type: 'varchar', length: 255, nullable: true })
  stripeId: string;

  @Column({ name: 'current_payment_method', type: 'varchar', length: 255, nullable: true })
  currentPaymentMethod: string;

  @Column({ name: 'address_line1', type: 'varchar', length: 255 })
  addressLine1: string;

  @Column({ name: 'address_line2', type: 'varchar', length: 255, nullable: true })
  addressLine2: string;

  @Column({ name: 'city', type: 'varchar', length: 255 })
  city: string;

  @Column({ name: 'state', type: 'varchar', length: 255 })
  state: string;

  @Column({ name: 'zip', type: 'varchar', length: 255 })
  zip: string;

  @Column({ name: 'timezone', type: 'varchar', length: 255, nullable: true })
  timezone: string;

  @Column({ name: 'cut_off', type: 'varchar', length: 50, default: 'weekly' })
  cutOff: string;

  @Column({ name: 'monthly_cut_off', type: 'tinyint', default: 0 })
  monthlyCutOff: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'datetime', precision: 6 })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime', precision: 6 })
  updatedAt: Date;

  @Column({ name: 'invoice_generation_date', type: 'datetime', nullable: true })
  invoiceGenerationDate: Date;

  @Column({
    name: 'billing_week',
    type: 'enum',
    enum: ['0', '1', '2', '3', '4', '5', '6'],
    default: '1',
  })
  billingWeek: string;

  @Column({
    name: 'consolidate_unprocessed_charges',
    type: 'tinyint',
    default: 1,
  })
  consolidateUnprocessedCharges: boolean;

  @Column({ name: 'group_by', type: 'varchar', length: 255, default: 'none' })
  groupBy: string;

  @Column({ name: 'region_id', type: 'int', nullable: true })
  regionId: number;

  @Column({ name: 'rate_type', type: 'int', default: 0 })
  rateType: number;

  @Column({
    name: 'markup_percent',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
  })
  markupPercent: number;

  @ManyToOne(() => Region, (region) => region.accounts)
  @JoinColumn({ name: 'region_id' })
  region: Region;
}
