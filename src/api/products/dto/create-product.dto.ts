import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Store ID is required.' })
  @IsString()
  @ApiProperty({
    description: 'Store ID',
    example: 'ejyioUEkjdlanlELJjdkall',
    required: true,
  })
  store_id: string;

  @IsNotEmpty({ message: 'Category ID is required.' })
  @IsString()
  @ApiProperty({
    description: 'Category ID',
    example: 'ejyioUEkjdlanlELJjdkall',
    required: true,
  })
  category_id: string;

  @IsNotEmpty({ message: 'Tag ID is required.' })
  @IsString()
  @ApiProperty({
    description: 'Tag ID',
    example: 'ejyioUEkjdlanlELJjdkall',
    required: true,
  })
  tag_id: string;

  @IsNotEmpty({ message: 'Product name is required.' })
  @IsString()
  @ApiProperty({
    description: 'Product Name',
    example: 'Product Name Example',
    required: true,
  })
  name: string;

  @IsNotEmpty({ message: 'Product description is required.' })
  @IsString()
  @ApiProperty({
    description: 'Product Description',
    example: 'Product Description Example',
    required: true,
  })
  description: string;

  @IsNotEmpty({ message: 'Product price is required.' })
  @IsNumber()
  @ApiProperty({
    description: 'Product Price',
    example: 29.99,
    required: true,
  })
  price: number;

  @IsNotEmpty({ message: 'Stock quantity is required.' })
  @IsNumber()
  @ApiProperty({
    description: 'Stock Quantity',
    example: 100,
    required: true,
  })
  stock_quantity: number;
}
