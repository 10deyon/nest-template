import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { STORE_PROFILES } from 'src/shared';
import { User } from './user.entity';

@Entity({ name: STORE_PROFILES })
export class StoreProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({})
  user_id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  postal_code: string;

  @Column({ nullable: true })
  country: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => User, (user) => user.store_profile, { onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // @OneToMany(() => Donor, donor => donor.user)
  // donors: Donor[];

  // @OneToOne(() => Notification, notification => notification.user)
  // notification: Notification;

  toPayload(): Partial<StoreProfile> {
    return {
      id: this.id,
      name: this.name,
      address: this.address,
      city: this.city,
      state: this.state,
      postal_code: this.postal_code,
      country: this.country,
      created_at: this.created_at,
    };
  }
}
