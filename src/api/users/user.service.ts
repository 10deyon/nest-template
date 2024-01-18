import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto';
import { StoreService } from '../stores/store.service';
import { JWTPayload } from 'src/shared';
import { CustomerService } from '../customer/customer.service';
import { User } from 'src/entities/user.entity';
import { UpdateUserDto } from './dto/update.dto';
import { Role } from 'src/shared/enums/roles.enums';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly storeService: StoreService,
    private readonly customerService: CustomerService,
    private readonly entityManager: EntityManager,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.entityManager.transaction(
      async (transactionalEntityManager) => {
        const existingUser = await transactionalEntityManager.findOne(User, {
          where: {
            email: createUserDto.email,
            phone_number: createUserDto.phone_number,
          },
        });

        let profile, createdUser;
        if (existingUser) {
          if (existingUser.role === createUserDto.role) {
            throw new HttpException(
              'User record already exist',
              HttpStatus.BAD_REQUEST,
            );
          }
          existingUser.role = `${existingUser.role}, ${createUserDto.role}`;
          await transactionalEntityManager.save(existingUser);
          createdUser = { ...existingUser };
        } else {
          const existingUserEmail = await transactionalEntityManager.findOne(
            User,
            {
              where: { email: createUserDto.email },
            },
          );

          if (existingUserEmail) {
            throw new HttpException(
              'Email already exist for another user',
              HttpStatus.BAD_REQUEST,
            );
          }

          const existingUserPhone = await transactionalEntityManager.findOne(
            User,
            {
              where: { phone_number: createUserDto.phone_number },
            },
          );

          if (existingUserPhone) {
            throw new HttpException(
              'Phone already exist for another user',
              HttpStatus.BAD_REQUEST,
            );
          }

          const newUser: Partial<User> = this.userRepository.create({
            email: createUserDto.email,
            phone_number: createUserDto.phone_number,
            role: createUserDto.role,
            password: createUserDto.password,
            longitude: createUserDto.longitude,
            latitude: createUserDto.latitude,
          });

          createdUser = await transactionalEntityManager.save(newUser);
        }

        if (createUserDto.role === Role.STORE) {
          profile = await this.storeService.create(
            createUserDto,
            createdUser.id,
            transactionalEntityManager,
          );
        } else if (createUserDto.role === Role.CUSTOMER) {
          profile = await this.customerService.create(
            createUserDto,
            createdUser.id,
            // transactionalEntityManager,
          );
        }

        delete createdUser.password;

        return { ...createdUser, profile };
      },
    );
  }

  async findByPhoneOrEmail(identifier) {
    const userExist = await this.userRepository.findOne({
      where: [{ email: identifier }, { phone_number: identifier }],
    });

    // const userExist = await this.userRepository
    //   .createQueryBuilder()
    //   .addSelect('password', 'password')
    //   .where('user.email = :identifier OR user.phone_number = :identifier', {
    //     identifier,
    //   })
    //   .getOne();
    // console.log(userExist);

    // //   .where({
    // //   where: [{ email: identifier }, { phone_number: identifier }],
    // // });

    return userExist;
  }

  async getById(id: string) {
    const userExist = await this.userRepository.findOneBy({ id });

    if (!userExist) {
      throw new HttpException(
        'User record does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    return userExist;
  }

  async upgradeAccount(data, user: User) {
    let upgradedAccount;
    if (data.role === Role.CUSTOMER) {
      upgradedAccount = await this.customerService.create(data, user.id);
    } else if (data.role === Role.STORE) {
      upgradedAccount = await this.storeService.create(data, user.id);
    }

    return upgradedAccount;
  }

  async profile(userRecord: JWTPayload) {
    const user = await this.userRepository.findOneBy({ id: userRecord.sub });

    let profile;
    const roles = user.role.split(',');
    if (roles.includes(Role.STORE)) {
      profile = await this.storeService.getStoreByUserId(userRecord.sub);
    } else {
      profile = await this.customerService.getCustomerByUserId(userRecord.sub);
    }

    delete user.password;
    delete user.tempPassword;

    if (!user) {
      throw new HttpException(
        'User record does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    return { ...user, profile };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // return await this.userRepository.update(id, updateUserDto);
  }
}
