import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ChatGroup } from './chatgroup.entity';
import { Skill } from './skill.entity';

@Entity('chat_group_skill')
export class ChatGroupSkill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 36 })
  chat_group_id: string;

  @Column()
  skill_id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @Column()
  created_by: number;

  @Column({ type: 'tinyint' })
  is_active: boolean;

  @ManyToOne(() => ChatGroup, (chat_group) => chat_group.chat_group_skill)
  @JoinColumn({ name: 'chat_group_id', referencedColumnName: 'id' })
  chat_group: ChatGroup;

  @ManyToOne(() => Skill, (skill) => skill.chat_group_skill)
  @JoinColumn({ name: 'skill_id', referencedColumnName: 'id' })
  skill: Skill;
}
