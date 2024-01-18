import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsLatitude,
  IsLongitude,
  MinLength,
  IsBoolean,
} from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty({ message: 'Latitude is required.' })
  @IsLatitude()
  @ApiProperty({ description: 'Latitude', example: 90, type: Number })
  latitude: number;

  @IsNotEmpty({ message: 'Longitude is required.' })
  @IsLongitude()
  @ApiProperty({ description: 'Longitude', example: 80, type: Number })
  longitude: number;

  @IsString({ message: 'Street Address must be a string.' })
  @IsNotEmpty({ message: 'Street Address is required.' })
  @ApiProperty({
    description: 'Street Address',
    example: '12, Fanala Island',
    type: String,
  })
  street_address: string;

  @IsString({ message: 'City must be a string.' })
  @IsNotEmpty({ message: 'City is required.' })
  @ApiProperty({ description: 'City', example: 'Wuse 2', type: String })
  city: string;

  @IsNotEmpty({ message: 'State is required.' })
  @IsString({ message: 'State must be a string.' })
  @IsNotEmpty({ message: 'State is required.' })
  @ApiProperty({ description: 'State', example: 'FCT Abuja', type: String })
  state: string;

  @ApiProperty({ description: 'Postal Code', example: '900288', type: String })
  @IsString({ message: 'Postal code must be a string.' })
  @IsNotEmpty({ message: 'Postal Code is required.' })
  @MinLength(5, {
    message: 'Postal Code must be at least 5 characters long.',
  })
  postal_code: string;

  @IsNotEmpty({ message: 'Country is required.' })
  @IsString({ message: 'Country must be a string.' })
  @ApiProperty({ description: 'Country', example: 'Nigeria', type: String })
  country: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ description: 'Country', example: true, type: Boolean })
  is_default: boolean;
}
