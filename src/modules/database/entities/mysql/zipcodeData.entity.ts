import { Entity, PrimaryColumn, Column, Point, OneToMany } from 'typeorm';
import { RegionZipcode } from './region_zipcodes.entity';

@Entity('zipcode_data')
export class ZipcodeData {
  @PrimaryColumn({ type: 'varchar', length: 16 })
  zip: string;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  lat: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  lng: number;

  @Column({ type: 'point', spatialFeatureType: 'Point', srid: 4326 })
  coordinate: Point;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column({ type: 'char', length: 2 })
  state_id: string;

  @Column({ type: 'varchar', length: 255 })
  state_name: string;

  @Column({ type: 'varchar', length: 255 })
  timezone: string;

  @OneToMany(() => RegionZipcode, regionZipcode => regionZipcode.zipcodeData)
  regionZipcodes: RegionZipcode[];
}
