import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Region } from './region.entity';
import { ZipcodeData } from './zipcodeData.entity';

@Entity('region_zipcodes')
export class RegionZipcode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    region_id: number;

    @Column({ length: 16, nullable: true })
    zip: string;

    @ManyToOne(() => Region)
    @JoinColumn({ name: 'region_id' })
    region: Region;

    @ManyToOne(() => ZipcodeData, zipcodeData => zipcodeData.regionZipcodes)
    zipcodeData: ZipcodeData;
}
