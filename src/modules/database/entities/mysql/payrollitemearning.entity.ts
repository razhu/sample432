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
import { Timesheet } from './timesheet.entity';

@Entity('payroll_item_earnings')
export class PayrollItemEarning {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  payroll_item_id: number;

  @Column()
  timesheet_id: number;

  @Column()
  amount: string;

  @Column('numeric', {
    precision: 10,
    scale: 2,
  })
  hours: number;

  @Column()
  earning_type: string;

  @Column()
  code: string;

  @Column()
  description: string;

  @Column()
  check_workplace_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => PayrollItems, (payrollItems) => payrollItems.payroll_item_earnings)
  @JoinColumn({ name: 'payroll_item_id', referencedColumnName: 'id' })
  payroll_item: PayrollItems;

  @ManyToOne(() => Timesheet, (timesheet) => timesheet.payroll_item_earnings)
  @JoinColumn({ name: 'timesheet_id', referencedColumnName: 'id' })
  timesheet: Timesheet;
}
