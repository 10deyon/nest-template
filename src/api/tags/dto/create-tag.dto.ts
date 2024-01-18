import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty({ message: 'Name is required.' })
  @IsString()
  @ApiProperty({
    description: 'Kitchen Appliances',
    example: 'Kitchen Appliances',
    required: true,
    type: String,
  })
  name: string;

  @IsNotEmpty({ message: 'Description is required.' })
  @IsString()
  @ApiProperty({
    description: 'Kikwo kitchen Appliances',
    example: 'Kikwo kitchen Appliances',
    required: true,
    type: String,
  })
  description: string;
}
