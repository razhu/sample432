import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { RegionZipcode } from './region_zipcodes.entity';
import { Account } from './account.entity';
import { Address } from './address.entity';

@Entity('regions')
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ type: 'datetime', nullable: true })
  created_at: Date;

  @Column({ type: 'datetime', nullable: true })
  updated_at: Date;

  @OneToMany(() => RegionZipcode, (regionZipCode) => regionZipCode.region)
  @JoinColumn({ name: 'id', referencedColumnName: 'region_id' })
  regionZipCodes: RegionZipcode[];

  @OneToMany(() => Account, (account) => account.region)
  accounts: Account[];

  @OneToMany(() => Address, (address) => address.region)
  addresses: Address[];
}
