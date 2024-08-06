import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class ReadProductByIdDto {
  @ApiProperty({
    required: true,
  })
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  public readonly id: string;
}
