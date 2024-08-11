import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateWarrantyClaimDto {
  @ApiProperty({
    required: true,
  })
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @ApiProperty({
    required: true,
  })
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  public readonly description: string;

  @ApiProperty({
    required: true,
  })
  @IsMongoId()
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  product: string;
}
