import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DELIVERY_ADDRESSES } from 'src/shared';

@Entity({ name: DELIVERY_ADDRESSES })
export class DeliveryAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({})
  customer_id: string;

  @Column({ nullable: false })
  recipient_name: string;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: false })
  longitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: false })
  latitude: number;

  @Column({ nullable: false })
  street_address: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  state: string;

  @Column({ nullable: false })
  postal_code: string;

  @Column({ nullable: false })
  country: string;

  @Column({ nullable: false })
  recipient_phone_number: string;

  @Column({ nullable: false, default: false })
  is_default: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  toPayload(): Partial<DeliveryAddress> {
    return {
      id: this.id,
      customer_id: this.customer_id,
      recipient_name: this.recipient_name,
      recipient_phone_number: this.recipient_phone_number,
      longitude: this.longitude,
      latitude: this.latitude,
      street_address: this.street_address,
      city: this.city,
      state: this.state,
      postal_code: this.postal_code,
      country: this.country,
      is_default: this.is_default,
      created_at: this.created_at,
    };
  }
}
