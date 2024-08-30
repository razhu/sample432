import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { Skill } from './skill.entity';

@Entity('skill_categories')
export class SkillCategory {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @Column({name: 'tenant_id', type: 'int' })
    tenantId: number;

    @Column({ name: 'agency_id' ,type: 'int' })
    agencyId: number;

    @Column({ type: 'varchar', length: 96 })
    name: string;

    @Column({ name:'display_name_en',type: 'varchar', length: 255 })
    displayNameEn: string;

    @Column({ name: 'display_name_es', type: 'varchar', length: 255 })
    displayNameEs: string;

    @Column({ name: 'description_en', type: 'varchar', length: 255 })
    descriptionEn: string;

    @Column({ name: 'description_es', type: 'varchar', length: 255 })
    descriptionEs: string;

    @Column({ name: 'image_key', type: 'varchar', length: 255 })
    imageKey: string;

    @CreateDateColumn({ name: 'created_at', type: 'datetime', precision: 6 })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'datetime', precision: 6 })
    updatedAt: Date;

    @OneToMany(() => Skill, skills => skills.skill_category)
    @JoinColumn({ name: 'id', referencedColumnName: 'category_id' })
    skills: Skill[];
}
