import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CATEGORIES } from 'src/shared';

@Entity({ name: CATEGORIES })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({})
  user_id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  toPayload(): Partial<Category> {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      created_at: this.created_at,
    };
  }
}
