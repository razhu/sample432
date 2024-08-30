import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Worker } from './worker.entity';
import { Payroll } from './payroll.entity';
import { PayrollItemEarning } from './payrollitemearning.entity';
import { PostTaxDeduction } from './posttaxdeduction.entity';
import { PayrollItemTax } from './payrollitemtax.entity';

@Entity('payroll_items')
export class PayrollItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  payroll_id: string;

  @Column()
  check_payroll_item_id: string;

  @Column()
  check_employee_id: string;

  @Column()
  status: string;

  @Column()
  net_pay: string;

  @Column()
  payment_method: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Worker, (worker) => worker.payroll_items)
  @JoinColumn({ name: 'check_employee_id', referencedColumnName: 'check_employee_id' })
  worker: Worker;

  @ManyToOne(() => Payroll, (payroll) => payroll.payroll_items)
  @JoinColumn({ name: 'payroll_id', referencedColumnName: 'id' })
  payroll: Payroll;

  @OneToMany(() => PayrollItemEarning, (payrollItemEarnings) => payrollItemEarnings.payroll_item)
  @JoinColumn({ name: 'id', referencedColumnName: 'payroll_item_id' })
  payroll_item_earnings: PayrollItemEarning[];

  @OneToMany(() => PostTaxDeduction, (postTaxDeduction) => postTaxDeduction.payroll_item)
  @JoinColumn({ name: 'id', referencedColumnName: 'payroll_item_id' })
  post_tax_deductions: PostTaxDeduction[];

  @OneToMany(() => PayrollItemTax, (payrollItemTax) => payrollItemTax.payroll_item)
  @JoinColumn({ name: 'id', referencedColumnName: 'payroll_item_id' })
  payroll_item_tax: PayrollItemTax[];
}
