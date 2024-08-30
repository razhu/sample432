import { CustomerOnboardingStatus } from '../../../../modules/customers/enums/customer.onboarding.status.enum';
import { CustomerStatusEnums } from '../../../../modules/customers/enums/customer.status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'int', nullable: true })
  tenant_id: number;

  @Column({ type: 'int', nullable: true })
  agency_id: number;

  @Column({ type: 'varchar', length: 128, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  type: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  logo_key: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  job_tax_type: string;

  @Column({ type: 'int', nullable: true })
  invoice_due_date: number;

  @Column({ type: 'tinyint', nullable: true })
  charge_first_order: number;

  @Column({ type: 'datetime', precision: 6 })
  created_at: Date;

  @Column({ type: 'datetime', precision: 6 })
  updated_at: Date;

  @Column({ type: 'int', nullable: false, default: CustomerStatusEnums.PENDING })
  status: CustomerStatusEnums;

  @Column({ type: 'varchar', length: 255, nullable: false, default: CustomerOnboardingStatus.IN_PROGRESS })
  onboarding_status: CustomerOnboardingStatus;
}
