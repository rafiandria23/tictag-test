import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({
    required: true,
  })
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
  })
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  description: string;
}
