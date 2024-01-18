import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from '../users/dto';
import { StoreProfile } from 'src/entities/store-profile.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(StoreProfile)
    private readonly storeProfileRepository: Repository<StoreProfile>,
  ) {}

  async create(
    data: CreateUserDto,
    userId: string,
    transactionalEntityManager: EntityManager = null,
  ) {
    const existingStore = await transactionalEntityManager.findOne(
      StoreProfile,
      {
        where: { user_id: userId },
      },
    );

    let createdProfile;
    if (existingStore) {
      createdProfile = { ...existingStore };
    } else {
      const newProfile: Partial<StoreProfile> =
        this.storeProfileRepository.create({
          user_id: userId,
          name: data.name,
          address: data.address,
          city: data.city,
          state: data.state,
          postal_code: data.postal_code,
          country: data.country,
        });

      createdProfile = await transactionalEntityManager.save(newProfile);
    }

    return createdProfile;
  }

  async getStoreByUserId(id: string) {
    const storeExist = await this.storeProfileRepository.findOne({
      where: { user_id: id },
    });

    return storeExist;
  }
}
