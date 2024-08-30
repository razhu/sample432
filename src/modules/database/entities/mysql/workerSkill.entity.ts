import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Worker } from './worker.entity';
import { Skill } from './skill.entity';

@Entity('worker_skills')
export class WorkerSkill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  worker_id: number;

  @Column({ type: 'int' })
  skill_id: number;

  @Column({ type: 'datetime', precision: 6 })
  created_at: Date;

  @Column({ type: 'datetime', precision: 6 })
  updated_at: Date;

  @ManyToOne(() => Worker, (worker) => worker.worker_skill)
  @JoinColumn({ name: 'worker_id', referencedColumnName: 'id' })
  worker: Worker;

  @ManyToOne(() => Skill, (skill) => skill.worker_skill)
  @JoinColumn({ name: 'skill_id', referencedColumnName: 'id' })
  skill: Skill;
}
