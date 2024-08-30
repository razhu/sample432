import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('prompts')
@Unique(['tenant_id', 'internal_key'])
export class Prompt {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'int', nullable: true })
  tenant_id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  internal_key: string;

  @Column({ type: 'varchar', length: 500, nullable: false })
  disply_text: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  role: string;

  @Column({ type: 'varchar', length: 4000, nullable: false })
  content: string;

  @Column({ default: true })
  active: boolean;
}
