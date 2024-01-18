import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from '../users/dto';
import { CustomerProfile } from 'src/entities/customer-profile.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerProfile)
    private readonly customerProfileRepository: Repository<CustomerProfile>,
  ) {}

  async create(data: CreateUserDto, userId: string) {
    const existingCustomer = await this.customerProfileRepository.findOne({
      where: { user_id: userId },
    });

    let createdProfile;
    if (existingCustomer) {
      createdProfile = { ...existingCustomer };
    } else {
      const newProfile: Partial<CustomerProfile> =
        this.customerProfileRepository.create({
          user_id: userId,
          first_name: data.first_name,
          last_name: data.last_name,
          address: data.address,
          city: data.city,
          state: data.state,
          postal_code: data.postal_code,
          country: data.country,
        });

      createdProfile = await this.customerProfileRepository.save(newProfile);
    }

    return createdProfile;
  }

  async getCustomerByUserId(id: string) {
    const customerExist = await this.customerProfileRepository.findOne({
      where: { user_id: id },
    });

    return customerExist;
  }
}
