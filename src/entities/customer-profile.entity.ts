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
import { CUSTOMER_PROFILES } from 'src/shared';
import { User } from './user.entity';

@Entity({ name: CUSTOMER_PROFILES })
export class CustomerProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({})
  user_id: string;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  last_name: string;

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

  @OneToOne(() => User, (user) => user.customer_profile, {
    onDelete: 'NO ACTION',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // @OneToMany(() => Donor, donor => donor.user)
  // donors: Donor[];

  // @OneToOne(() => Notification, notification => notification.user)
  // notification: Notification;

  toPayload(): Partial<CustomerProfile> {
    return {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      address: this.address,
      city: this.city,
      state: this.state,
      postal_code: this.postal_code,
      country: this.country,
      created_at: this.created_at,
    };
  }
}
