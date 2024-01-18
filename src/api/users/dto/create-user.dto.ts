import {
  IsMobilePhone,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { Match } from '../../../shared';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from './base.dto';

export class CreateUserDto extends BaseDto {
  @IsNotEmpty({ message: 'Email is required.' })
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'Email', example: 'hassan@sample.com' })
  email: string;

  @IsNotEmpty({ message: 'Phone number is required.' })
  @IsMobilePhone('en-NG', undefined)
  @ApiProperty({ description: 'Phone number', example: '+2347030000000' })
  phone_number: string;

  @IsNotEmpty({ message: 'Password is required.' })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @ApiProperty({ description: 'Password', example: 'Password' })
  password: string;

  @IsNotEmpty({ message: 'Confirm password is required.' })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @ApiProperty({ description: 'Confirm Password', example: 'Password' })
  @Match(CreateUserDto, (s) => s.password)
  confirm_password: string;
}
