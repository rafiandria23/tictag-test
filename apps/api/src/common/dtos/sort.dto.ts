import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';

import { SortDirection } from '../common.constant';

export class SortDto {
  @ApiProperty({
    required: false,
    enum: SortDirection,
  })
  @IsEnum(SortDirection)
  @IsString()
  @IsOptional()
  public readonly sort?: SortDirection = SortDirection.Asc;
}
