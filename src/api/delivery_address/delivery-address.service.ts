import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/entities/product.entity';
import { DeliveryAddress } from 'src/entities/develiver-address.entity';
import { CreateAddressDto } from './dto';

@Injectable()
export class DeliveryAddressService {
  constructor(
    @InjectRepository(DeliveryAddress)
    private readonly deliveryAddressRepository: Repository<Product>,
  ) {}

  async create(customerId: string, addressDto: CreateAddressDto) {
    const address = new DeliveryAddress();
    address.customer_id = customerId;
    // address.recipient_name = addressDto.recipient_name;
    // address.recipient_phone_number = addressDto.recipient_phone_number;
    address.longitude = addressDto.longitude;
    address.latitude = addressDto.latitude;
    address.street_address = addressDto.street_address;
    address.city = addressDto.city;
    address.state = addressDto.state;
    address.postal_code = addressDto.postal_code;
    address.country = addressDto.country;
    return await this.deliveryAddressRepository.save(address);
  }

  async getById(id: string): Promise<Product | undefined> {
    const address = await this.deliveryAddressRepository.findOneBy({ id });

    if (!address) {
      throw new HttpException(
        `Delivery address not yet updated`,
        HttpStatus.NOT_FOUND,
      );
    }

    return address;
  }

  async update(id: string, addressDto: CreateAddressDto) {
    const product = await this.deliveryAddressRepository.findOneBy({ id });

    const address = new DeliveryAddress();
    // address.recipient_name = addressDto.recipient_name;
    // address.recipient_phone_number = addressDto.recipient_phone_number;
    address.longitude = addressDto.longitude;
    address.latitude = addressDto.latitude;
    address.street_address = addressDto.street_address;
    address.city = addressDto.city;
    address.state = addressDto.state;
    address.postal_code = addressDto.postal_code;
    address.country = addressDto.country;
    return await this.deliveryAddressRepository.save(product);
  }

  async delete(id: string): Promise<void> {
    await this.deliveryAddressRepository.delete(id);
  }
}
