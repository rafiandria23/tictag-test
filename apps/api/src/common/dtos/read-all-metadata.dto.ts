import { ApiProperty } from '@nestjs/swagger';

export class ReadAllMetadataDto {
  @ApiProperty({
    required: true,
  })
  public readonly total: number;
}
