import {
  IsString,
  MinLength,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsEnum,
  ValidateIf,
} from 'class-validator';
import { Role } from 'src/shared/enums/roles.enums';
import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
  @IsNotEmpty({ message: 'Role is required.' })
  @IsString({ each: true, message: 'Role must be a string' })
  @IsEnum(Role, { message: 'Invalid role value.' })
  @ApiProperty({
    description: 'User roles',
    example: Role.CUSTOMER,
    enum: Role,
  })
  role: Role;

  @IsNotEmpty({ message: 'Latitude is required.' })
  @IsLatitude()
  @ApiProperty({ description: 'Latitude', example: 90, type: Number })
  latitude: number;

  @IsNotEmpty({ message: 'Longitude is required.' })
  @IsLongitude()
  @ApiProperty({ description: 'Longitude', example: 80, type: Number })
  longitude: number;

  @ValidateIf((o) => o.role === Role.CUSTOMER)
  @IsNotEmpty({ message: 'First name is required for the customer role.' })
  @IsString({ message: 'First name must be a string.' })
  @ApiProperty({
    description: 'First Name',
    example: 'Hassan',
    required: false,
  })
  first_name?: string;

  @ValidateIf((o) => o.role === Role.CUSTOMER)
  @IsNotEmpty({ message: 'Last name is required for the customer role.' })
  @IsString({ message: 'Last name must be a string.' })
  @ApiProperty({
    description: 'Last Name',
    example: 'Sulaimon',
    required: false,
  })
  last_name?: string;

  @ValidateIf((o) => o.role === Role.STORE)
  @IsNotEmpty({ message: 'Name is required for the store role.' })
  @IsString({ message: 'Name must be a string.' })
  @ApiProperty({
    description: 'Store Name',
    example: 'Foreign Supermarket',
    required: false,
  })
  name?: string;

  @IsString({ message: 'Address must be a string.' })
  @IsNotEmpty({ message: 'Address is required.' })
  @ApiProperty({ description: 'Address', example: '12, Fanala Island' })
  address: string;

  @IsString({ message: 'City must be a string.' })
  @IsNotEmpty({ message: 'City is required.' })
  @ApiProperty({ description: 'City', example: 'Wuse 2' })
  city: string;

  @IsNotEmpty({ message: 'State is required.' })
  @IsString({ message: 'State must be a string.' })
  @IsNotEmpty({ message: 'State is required.' })
  @ApiProperty({ description: 'State', example: 'FCT Abuja' })
  state: string;

  @ApiProperty({ description: 'Postal Code', example: '900288' })
  @IsString({ message: 'Postal code must be a string.' })
  @IsNotEmpty({ message: 'Postal Code is required.' })
  @MinLength(5, { message: 'Postal Code must be at least 5 characters long.' })
  postal_code: string;

  @IsNotEmpty({ message: 'Country is required.' })
  @IsString({ message: 'Country must be a string.' })
  @ApiProperty({ description: 'Country', example: 'Nigeria' })
  country: string;
}
