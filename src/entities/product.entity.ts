import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PRODUCTS } from 'src/shared';

@Entity({ name: PRODUCTS })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({})
  store_id: string;

  @Column({})
  tag_id: string;

  @Column({})
  category_id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  stock_quantity: number;

  @Column({ nullable: false, default: false })
  is_available: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  toPayload(): Partial<Product> {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      stock_quantity: this.stock_quantity,
      created_at: this.created_at,
    };
  }
}
