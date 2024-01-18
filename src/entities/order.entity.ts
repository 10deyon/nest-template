import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ORDERS } from 'src/shared';
import { OrderDetails } from './order-details.entity';

@Entity({ name: ORDERS })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({})
  customer_id: string;

  @Column({ nullable: false })
  total_amount: number;

  @Column({ nullable: false })
  reference: string;

  @Column({ nullable: false })
  tracking_no: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'dispatched', 'delivered', 'cancelled'],
    default: 'pending',
  })
  status: string;

  @CreateDateColumn({ nullable: false })
  order_date: Date;

  @CreateDateColumn({ nullable: true })
  delivery_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => OrderDetails, (orderItem) => orderItem.order, {
    eager: false,
  })
  order_items: OrderDetails[];

  toPayload(): Partial<Order> {
    return {
      id: this.id,
      customer_id: this.customer_id,
      total_amount: this.total_amount,
      reference: this.reference,
      order_date: this.order_date,
      delivery_date: this.delivery_date,
      status: this.status,
      created_at: this.created_at,
    };
  }
}
