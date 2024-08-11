import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';
import { Transform } from 'class-transformer';

export class ReadProductByIdDto {
  @ApiProperty({
    required: true,
  })
  @IsMongoId()
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  public readonly id: string;
}
