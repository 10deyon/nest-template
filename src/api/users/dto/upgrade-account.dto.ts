import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsNotEmpty,
  IsEnum,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Role } from 'src/shared/enums/roles.enums';
import { BaseDto } from './base.dto';

export class UpgradeAccountDto extends BaseDto {}
//   @IsNotEmpty({ message: 'Role is required.' })
//   @IsString({ each: true })
//   @IsEnum(Role, { message: 'Invalid role value.' })
//   @ApiProperty({
//     description: 'User roles',
//     example: Role.CUSTOMER,
//     enum: Role,
//   })
//   role: Role;

//   @IsNotEmpty({ message: 'Latitude is required.' })
//   @IsLatitude()
//   @ApiProperty({
//     description: 'Latitude',
//     required: true,
//     example: 90,
//     type: Number,
//   })
//   latitude: number;

//   @IsNotEmpty({ message: 'Longitude is required.' })
//   @IsLongitude()
//   @ApiProperty({
//     description: 'Longitude',
//     required: true,
//     example: 80,
//     type: Number,
//   })
//   longitude: number;

//   @ValidateIf((o) => o.role === Role.CUSTOMER)
//   @IsNotEmpty({ message: 'First name is required for the customer role.' })
//   @IsString()
//   @ApiProperty({
//     description: 'First Name',
//     example: 'Hassan',
//     required: false,
//   })
//   first_name?: string;

//   @ValidateIf((o) => o.role === Role.CUSTOMER)
//   @IsNotEmpty({ message: 'Last name is required for the customer role.' })
//   @IsString()
//   @ApiProperty({
//     description: 'Last Name',
//     example: 'Sulaimon',
//     required: false,
//   })
//   last_name?: string;

//   @ValidateIf((o) => o.role === Role.STORE)
//   @IsNotEmpty({ message: 'Name is required for the store role.' })
//   @IsString()
//   @ApiProperty({
//     description: 'Store Name',
//     example: 'Foreign Supermarket',
//     required: false,
//   })
//   name?: string;

//   @IsNotEmpty({ message: 'Address is required.' })
//   @IsString()
//   @ApiProperty({
//     description: 'Address',
//     example: '12, Fanala Island',
//     required: true,
//   })
//   address: string;

//   @IsNotEmpty({ message: 'City is required.' })
//   @IsString()
//   @ApiProperty({ description: 'City', example: 'Wuse 2', required: true })
//   city: string;

//   @IsNotEmpty({ message: 'State is required.' })
//   @IsString()
//   @ApiProperty({ description: 'State', example: 'FCT Abuja', required: true })
//   state: string;

//   @IsNotEmpty({ message: 'Postal Code is required.' })
//   @IsString()
//   @MinLength(5, { message: 'Postal Code must be at least 5 characters long.' })
//   @ApiProperty({
//     description: 'Postal Code',
//     example: '900288',
//     required: true,
//   })
//   postal_code: string;

//   @IsNotEmpty({ message: 'Country is required.' })
//   @IsString()
//   @ApiProperty({ description: 'Country', example: 'Nigeria', required: true })
//   country: string;
// }
