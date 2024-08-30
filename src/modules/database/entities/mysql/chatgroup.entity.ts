import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Job } from './job.entity';
import { ChatGroupUser } from './chatgroupuser.entity';
import { ChatGroupSkill } from './chatGroupSkill.entity';
import { ChatGroupTypeEnums } from '../../../../modules/communication/enum/chat.group.type.enum';

@Entity('chat_groups')
export class ChatGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'datetime', precision: 6 })
  created_at: Date;

  @Column({ type: 'datetime', precision: 6 })
  updated_at: Date;

  @Column({ type: 'datetime' })
  expire_at: Date;

  @Column({ type: 'int', default: 0 })
  created_by: number;

  @Column({ type: 'tinyint', default: 1 })
  is_active: boolean;

  @Column({ type: 'tinyint', default: 0 })
  is_broadcast: boolean;

  @Column({ type: 'datetime' })
  last_message_sent_at: Date;

  @Column({ type: 'text' })
  last_message: string;

  @Column({ type: 'int', default: 0 })
  last_message_sender_id: number;

  @Column({ type: 'json', default: null })
  filters: Record<string, number | string | string[]>;

  @ManyToOne(() => User, (last_message_sender) => last_message_sender.lastMessage)
  @JoinColumn({ name: 'last_message_sender_id', referencedColumnName: 'id' })
  last_message_sender: User;

  @Column({ type: 'int', nullable: false, default: ChatGroupTypeEnums.WORKER })
  chat_group_type: ChatGroupTypeEnums;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'chat_group_users',
    joinColumn: {
      name: 'chat_group_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: User[];

  @OneToMany(() => ChatGroupUser, (chat_group_user) => chat_group_user.chat_group)
  @JoinColumn({ name: 'id', referencedColumnName: 'chat_group_id' })
  chat_group_user: ChatGroupUser[];

  @ManyToMany(() => Job)
  @JoinTable({
    name: 'chat_group_jobs',
    joinColumn: {
      name: 'chat_group_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'job_id',
      referencedColumnName: 'id',
    },
  })
  jobs: Job[];

  @OneToMany(() => ChatGroupSkill, (chat_group_skill) => chat_group_skill.chat_group)
  @JoinColumn({ name: 'id', referencedColumnName: 'chat_group_id' })
  chat_group_skill: ChatGroupSkill[];
}
