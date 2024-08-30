import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Skill } from './skill.entity';

@Entity('rates')
export class Rates {
    @PrimaryGeneratedColumn('increment',{ type: 'bigint' })
    id: number;

    @Column({  name: 'tenant_id',type: 'int' })
    tenantId: number;

    @Column({ name:'agency_id', type: 'int' })
    agencyId: number;

    @Column({ name: 'service_area_id', type: 'int' })
    serviceAreaId: number;

    @Column({ name: 'account_id', type: 'int' })
    accountId: number;

    @Column({ name: 'skill_id',type: 'int' })
    skillId: number;

    @Column({ name: 'address_id' ,type: 'int' })
    addressId: number;

    @Column({ type: 'tinyint', width: 1, default: () => "1" })
    active: boolean;

    @Column({ type: 'int' })
    level: number;

    @Column({ name: 'base_cost', type: 'int' })
    baseCost: number;

    @Column({ name: 'base_pay', type: 'int' })
    basePay: number;

    @Column({ name: 'overtime_factor',type: 'int' })
    overtimeFactor: number;

    @Column({name: 'surge_cost', type: 'int' })
    surgeCost: number;

    @Column({name:'surge_pay', type: 'int' })
    surgePay: number;

    @CreateDateColumn({ name: 'created_at', type: 'datetime', precision: 6 })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'datetime', precision: 6 })
    updatedAt: Date;

    @ManyToOne(() => Skill, (skill) => skill.skill_rates)
    @JoinColumn({ name: 'skill_id', referencedColumnName: 'id' })
    skill: Skill;
}
