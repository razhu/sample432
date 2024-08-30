import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PayrollItems } from './payrollitems.entity';

@Entity('payroll_item_taxes')
export class PayrollItemTax {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  payroll_item_id: number;

  @Column()
  check_tax_id: string;

  @Column()
  description: string;

  @Column()
  amount: string;

  @Column()
  payer: string;

  @Column()
  remittable: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => PayrollItems, (payrollItems) => payrollItems.payroll_item_tax)
  @JoinColumn({ name: 'payroll_item_id', referencedColumnName: 'id' })
  payroll_item: PayrollItems;
}
