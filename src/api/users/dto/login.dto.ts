import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Email or phone number is required.' })
  @IsString()
  @ApiProperty({
    description: 'Email or Phone number',
    example: 'hassan@sample.com or +2347030000000',
    required: true,
    type: String,
  })
  identifier: string;

  @IsNotEmpty({ message: 'Password is required.' })
  @IsString()
  @ApiProperty({ description: 'Password', example: 'Password', required: true })
  password: string;
}
