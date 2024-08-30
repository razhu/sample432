import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ChatGroup } from './chatgroup.entity';

@Entity('chat_group_jobs')
export class ChatGroupJob {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 36 })
  chat_group_id: string;

  @Column({ type: 'int', nullable: false })
  job_id: number;

  @ManyToOne(() => ChatGroup, (chat_group) => chat_group.jobs)
  @JoinColumn({ name: 'chat_group_id', referencedColumnName: 'id' })
  chat_group: ChatGroup;
}
