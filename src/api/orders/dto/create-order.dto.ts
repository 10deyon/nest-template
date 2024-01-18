import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  ValidateNested,
  IsBoolean,
  IsOptional,
  IsMobilePhone,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateAddressDto } from 'src/api/delivery_address/dto';

class OrderItem {
  @IsNotEmpty({ message: 'Quantity is required.' })
  @IsNumber({}, { message: 'Quantity must be a number.' })
  @ApiProperty({
    description: 'Quantity',
    type: Number,
    example: 20,
  })
  quantity: number;

  @IsString({ message: 'Store Id must be a string.' })
  @IsNotEmpty({ message: 'Store Id is required.' })
  @ApiProperty({
    description: 'Store ID',
    type: String,
    example: 'a7a0076e-26ec-4f5d-8c0f-8376e9cbd7cc',
  })
  store_id: string;

  @IsString({ message: 'Product Id must be a string.' })
  @IsNotEmpty({ message: 'Product Id is required.' })
  @ApiProperty({
    description: 'Product ID',
    type: String,
    example: 'a7a0076e-26ec-4f5d-8c0f-8376e9cbd7cc',
  })
  product_id: string;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: 'Use Default Address',
    example: true,
    type: Boolean,
  })
  use_default_address: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  @ApiProperty({
    type: CreateAddressDto,
  })
  delivery_address: CreateAddressDto;

  @IsNotEmpty({ message: 'Recipient name is required.' })
  @IsString({ message: 'Recipient name must be a string.' })
  @ApiProperty({
    description: 'Recipient Name',
    example: 'Hassan',
    required: true,
    type: String,
  })
  recipient_name: string;

  @IsNotEmpty({ message: 'Phone number is required.' })
  @IsMobilePhone('en-NG', undefined)
  @ApiProperty({
    description: 'Phone number',
    example: '+2347030000000',
    type: String,
  })
  recipient_phone_number: string;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  @ApiProperty({ description: 'Order items', type: [OrderItem] })
  order: OrderItem[];
}
