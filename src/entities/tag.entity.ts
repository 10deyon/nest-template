import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TAGS } from 'src/shared';

@Entity({ name: TAGS })
export class Tag {
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

  toPayload(): Partial<Tag> {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      created_at: this.created_at,
    };
  }
}
