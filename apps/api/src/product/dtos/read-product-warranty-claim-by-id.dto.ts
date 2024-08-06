import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class ReadProductWarrantyClaimByIdDto {
  @ApiProperty({
    required: true,
  })
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  public readonly id: string;
}
