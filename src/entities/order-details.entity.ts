import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ORDER_DETAILS } from 'src/shared';
import { Order } from './order.entity';

@Entity({ name: ORDER_DETAILS })
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({})
  order_id: string;

  @Column({})
  store_id: string;

  @Column({})
  product_id: string;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Order, (order) => order.order_items)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  toPayload(): Partial<OrderDetails> {
    return {
      id: this.id,
      order_id: this.order_id,
      store_id: this.store_id,
      product_id: this.product_id,
      quantity: this.quantity,
      price: this.price,
      created_at: this.created_at,
    };
  }
}
