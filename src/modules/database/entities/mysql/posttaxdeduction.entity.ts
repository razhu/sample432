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

@Entity('post_tax_deductions')
export class PostTaxDeduction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  payroll_item_id: number;

  @Column()
  check_ptd_id: string;

  @Column()
  ptd_type: string;

  @Column()
  description: string;

  @Column()
  @Column({ type: 'float', precision: 10, scale: 2 })
  amount: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => PayrollItems, (payrollItems) => payrollItems.post_tax_deductions)
  @JoinColumn({ name: 'payroll_item_id', referencedColumnName: 'id' })
  payroll_item: PayrollItems;
}
