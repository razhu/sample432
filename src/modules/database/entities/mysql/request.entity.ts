import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('requests')
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  email: string;

  @Column({ type: 'datetime', name: 'created_at', default: new Date() })
  createdAt: Date;

  @Column({ type: 'datetime', name: 'updated_at', default: new Date() })
  updatedAt: Date;
}
