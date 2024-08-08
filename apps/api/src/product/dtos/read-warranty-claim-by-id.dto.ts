import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class ReadWarrantyClaimByIdDto {
  @ApiProperty({
    required: true,
  })
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  public readonly id: string;
}
