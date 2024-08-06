import { ApiProperty } from '@nestjs/swagger';

export class ReadAllMetadataDto {
  @ApiProperty()
  public readonly total: number;
}
