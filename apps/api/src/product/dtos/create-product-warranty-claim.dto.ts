import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class CreateProductWarrantyClaimDto {
  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  public readonly description: string;

  @ApiProperty({
    required: true,
  })
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  product: string;
}
