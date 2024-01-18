import { compare, hash } from 'bcryptjs';
import crypto from 'crypto';
import { sign } from 'jsonwebtoken';
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
  AfterLoad,
} from 'typeorm';
import { JWTPayload, USERS } from 'src/shared';
import config from '../core/config/config';
import { StoreProfile } from './store-profile.entity';
import { CustomerProfile } from './customer-profile.entity';

const CONFIG = config();

@Entity({ name: USERS })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, nullable: false })
  phone_number: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  role: string;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: false })
  longitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: false })
  latitude: number;

  @Column({ nullable: false, default: false })
  status: boolean;

  @Column({ nullable: true })
  password_changed_at: string;

  @Column({ nullable: true })
  password_reset_token: string;

  @Column({ nullable: true })
  password_reset_expires: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  public tempPassword: string;

  @AfterLoad()
  private loadTempPassword() {
    this.tempPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.tempPassword === this.password) return;

    this.password = await hash(this.password, 12);
  }

  @OneToOne(() => StoreProfile, (store_profile) => store_profile.user)
  store_profile: StoreProfile;

  @OneToOne(() => CustomerProfile, (customer_profile) => customer_profile.user)
  customer_profile: CustomerProfile;

  // @OneToMany(() => Donor, donor => donor.user)
  // donors: Donor[];

  // @OneToOne(() => Notification, notification => notification.user)
  // notification: Notification;

  toResponse(): Partial<User> {
    const responseUser = new User();
    responseUser.id = this.id;
    responseUser.email = this.email;
    responseUser.phone_number = this.phone_number;
    responseUser.role = this.role;
    responseUser.longitude = this.longitude;
    responseUser.latitude = this.latitude;
    responseUser.status = this.status;
    responseUser.created_at = this.created_at;

    return responseUser;
  }

  toPayload(): Partial<User> {
    return {
      id: this.id,
      email: this.email,
      phone_number: this.phone_number,
      role: this.role,
      longitude: this.longitude,
      latitude: this.latitude,
      status: this.status,
      created_at: this.created_at,
    };
  }

  JWTPayload(): JWTPayload {
    return {
      sub: this.id,
      email: this.email,
      phone_number: this.phone_number,
      role: this.role,
    };
  }

  createPasswordResetToken() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.password_reset_token = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    this.password_reset_expires = new Date(Date.now() + 30 * 60 * 1000);

    return resetToken;
  }

  async correctPassword<T extends string>(
    candidatePassword: T,
    userPassword: T,
  ) {
    return await compare(candidatePassword, userPassword);
  }
}
