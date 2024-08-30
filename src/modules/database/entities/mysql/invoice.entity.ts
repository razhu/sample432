import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('invoices')

export class Invoice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: false })
    customer_id: number;

    @Column({ type: 'int', nullable: false })
    account_id: number;

    @Column({ type: 'varchar', nullable: false })
    stripe_customer_id: string;

    @Column({ type: 'varchar', nullable: false })
    stripe_invoice_id: string;

    @Column({ type: 'varchar', nullable: false })
    number: string;

    @Column({ type: 'varchar', nullable: false })
    status: string;

    @Column({ type: 'varchar', nullable: true })
    description: string;

    @Column({ type: 'varchar', nullable: false })
    hosted_invoice_url: string;

    @Column({ type: 'varchar', nullable: false })
    invoice_pdf: string;

    @Column({ type: 'varchar', nullable: false })
    created: Date;

    @Column({ type: 'varchar', nullable: false })
    due_date: Date;

    @Column({ type: 'decimal', nullable: false })
    subtotal: number;

    @Column({ type: 'decimal', nullable: false })
    total: number;

    @Column({ type: 'decimal', nullable: false })
    amount_due: number;

    @Column({ type: 'varchar', nullable: false })
    currency: string;

    @Column({ type: 'boolean', nullable: false, default: false })
    deleted: boolean;

    @Column({ type: 'datetime', nullable: false })
    created_at: Date;

    @Column({ type: 'datetime', nullable: false })
    updated_at: Date;

    @Column({ type: 'boolean', nullable: false, default: false })
    auto_approve: boolean;

    @Column({ type: 'int', nullable: false })
    created_by: number;

    @Column({ type: 'int', nullable: false, default: 0 })
    lock_counter: number;

    @Column({ type: 'datetime', nullable: true })
    refreshed_at: Date;

    @Column({ type: 'varchar', nullable: false })
    invoice_uid: string;
}
