import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ChatGroup } from './chatgroup.entity';
import { User } from './user.entity';
import { ChatGroupUserType } from '../../../communication/types';
import { GravyWorkUserType } from '../../../general/types';

@Entity('chat_group_users')
export class ChatGroupUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 36, name: 'chat_group_id' })
  chat_group_id: string;

  @Column({ type: 'int', nullable: false })
  user_id: number;

  @Column({ type: 'varchar', length: 100 })
  group_user_type: ChatGroupUserType;

  @Column({ type: 'datetime', precision: 6 })
  created_at: Date;

  @Column({ type: 'int', default: 0 })
  unread_message_count: number;

  @Column({ type: 'tinyint', default: 0 })
  is_deleted: number;

  @Column({ type: 'datetime', precision: 6 })
  updated_at: Date;

  @Column({ type: 'varchar', length: 255 })
  gw_user_type: GravyWorkUserType;

  @ManyToOne(() => ChatGroup, (chat_group) => chat_group.users)
  @JoinColumn({ name: 'chat_group_id', referencedColumnName: 'id' })
  chat_group: ChatGroup;

  @ManyToOne(() => User, (user) => user.chatGroupUser)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
