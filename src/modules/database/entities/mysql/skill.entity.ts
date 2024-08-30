import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { WorkerSkill } from './workerSkill.entity';
import { ChatGroupSkill } from './chatGroupSkill.entity';
import { SkillCategory } from './skillcategory.entity';
import { Rates } from './rates.entity';

@Entity('skills')
export class Skill {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  tenant_id: number;

  @Column({ type: 'int', nullable: true })
  agency_id: number;

  @Column({ type: 'int', nullable: true })
  category_id: number;

  @Column({ type: 'varchar', length: 96 })
  name: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  display_name_en: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  display_name_es: string;

  @Column({ type: 'varchar', nullable: true, length: 750 })
  description_en: string;

  @Column({ type: 'varchar', nullable: true, length: 750 })
  description_es: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  image_key: string;

  @Column({ default: 1, type: 'tinyint' })
  requestable: boolean;

  @Column({ default: 0, type: 'tinyint' })
  deleted: boolean;

  @CreateDateColumn({ type: 'datetime', precision: 6 })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', precision: 6 })
  updated_at: Date;

  @Column({ default: 0, type: 'tinyint' })
  gravy_trained: boolean;

  @OneToMany(() => WorkerSkill, (worker_skill) => worker_skill.skill)
  @JoinColumn({ name: 'id', referencedColumnName: 'skill_id' })
  worker_skill: WorkerSkill[];

  @OneToMany(() => ChatGroupSkill, (chat_group_skill) => chat_group_skill.skill)
  @JoinColumn({ name: 'id', referencedColumnName: 'skill_id' })
  chat_group_skill: ChatGroupSkill[];

  @ManyToOne(() => SkillCategory, skill_category => skill_category.skills)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  skill_category: SkillCategory[];

  @OneToMany(() => Rates, (rate) => rate.skill)
  @JoinColumn({ name: 'id', referencedColumnName: 'skill_id' })
  skill_rates: Rates[];
}
