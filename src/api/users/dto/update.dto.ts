import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsMobilePhone,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  ValidateIf,
} from 'class-validator';
import { Match } from 'src/shared';
import { Role } from 'src/shared/enums/roles.enums';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class ChangePasswordDto {
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @ApiProperty({
    description: 'New Password',
    example: 'Password',
    required: true,
    title: 'newPassword',
  })
  new_password: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @ApiProperty({
    description: 'Confirm Password',
    example: 'Password',
    required: true,
    title: 'confirm password',
  })
  @Match(ChangePasswordDto, (s) => s.new_password)
  confirm_password: string;
}

export class updateProfileDto {
  @IsNotEmpty({ message: 'Role is required.' })
  @IsString({ each: true })
  @IsEnum(Role, { message: 'Invalid role value.' })
  @ApiProperty({
    description: 'User roles',
    example: Role.CUSTOMER,
    enum: Role,
  })
  role: Role;

  @ValidateIf((o) => o.role === Role.CUSTOMER)
  @IsNotEmpty({ message: 'First name is required for the customer role.' })
  @IsString()
  @ApiProperty({
    description: 'First Name',
    example: 'Hassan',
    required: false,
  })
  first_name?: string;

  @ValidateIf((o) => o.role === Role.CUSTOMER)
  @IsNotEmpty({ message: 'Last name is required for the customer role.' })
  @IsString()
  @ApiProperty({
    description: 'Last Name',
    example: 'Sulaimon',
    required: false,
  })
  last_name?: string;

  @ValidateIf((o) => o.role === Role.STORE)
  @IsNotEmpty({ message: 'Name is required for the store role.' })
  @IsString()
  @ApiProperty({
    description: 'Store Name',
    example: 'Foreign Supermarket',
    required: false,
  })
  name?: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  @ApiProperty({
    description: 'Email',
    example: 'user@sample.com',
    required: true,
    title: 'email',
  })
  email: string;

  @IsMobilePhone('en-NG', undefined)
  @IsOptional()
  @ApiProperty({
    description: 'Phone number',
    example: '+2347030000000',
    required: true,
    title: 'phone',
  })
  phone: string;
}
