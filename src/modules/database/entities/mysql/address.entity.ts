import { 
	Entity, 
	PrimaryGeneratedColumn, 
	Column, 
	CreateDateColumn, 
	UpdateDateColumn, 
	ManyToOne, 
	JoinColumn, 
	Point 
} from 'typeorm';
import { Region } from './region.entity';
  
@Entity('addresses')
export class Address {
	@PrimaryGeneratedColumn('increment')
	id: bigint;

	@Column({ name: 'tenant_id', type: 'int', nullable: true })
	tenantId: number;
  
	@Column({ name: 'agency_id', type: 'int', nullable: true })
	agencyId: number;
  
	@Column({ name: 'customer_id', type: 'int', nullable: true })
	customerId: number;

	@Column({ type: 'varchar', length: 128, nullable: true })
	name: string;

	@Column({ name: 'address_line1', type: 'varchar', length: 128, nullable: true })
	addressLine1: string;

	@Column({ name: 'address_line2', type: 'varchar', length: 64, nullable: true })
	addressLine2: string;

	@Column({ type: 'varchar', length: 32, nullable: true })
	city: string;

	@Column({ type: 'varchar', length: 2, nullable: true })
	state: string;

	@Column({ type: 'varchar', length: 16, nullable: true })
	zip: string;

	@Column({ type: 'point', spatialFeatureType: 'Point', srid: 4326 })
	coords: Point;

	@Column({ type: 'varchar', length: 96, nullable: false })
	timezone: string;

	@Column({ name: 'check_workplace_id', type: 'varchar', length: 255, nullable: true })
	checkWorkplaceId: string;

	@Column({ type: 'tinyint', width: 1, nullable: true })
	active: boolean;

	@CreateDateColumn({ name: 'created_at', type: 'datetime', precision: 6, nullable: false })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at', type: 'datetime', precision: 6, nullable: false })
	updatedAt: Date;

	@Column({ type: 'varchar', length: 64, nullable: true })
	neighborhood: string;

	@Column({ name: 'region_id', type: 'int', nullable: true })
	regionId: number;

	@ManyToOne(() => Region, (region) => region.addresses)
	@JoinColumn({ name: 'region_id' })
	region: Region;
}