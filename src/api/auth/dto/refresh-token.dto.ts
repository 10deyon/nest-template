import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsNotEmpty({ message: 'Email or phone number is required.' })
  @IsString()
  @ApiProperty({
    description: 'Refresh Token',
    example: 'ejyioUEkjdlanlELJjdkall',
    required: true,
    type: String,
  })
  refresh_token: string;
}
