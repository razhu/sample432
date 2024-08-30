import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { PayrollItems } from './payrollitems.entity';

@Entity('payrolls')
export class Payroll {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tenant_id: number;

  @Column()
  check_payroll_id: string;

  @Column()
  payday: Date;

  @Column()
  approval_deadline: Date;

  @Column()
  period_start: Date;

  @Column()
  period_end: Date;

  @Column()
  status: string;

  @Column()
  payroll_type: string;

  @Column({ nullable: true })
  approved_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => PayrollItems, (payrollItem) => payrollItem.payroll)
  @JoinColumn({ name: 'id', referencedColumnName: 'payroll_id' })
  payroll_items: PayrollItems[];
}
