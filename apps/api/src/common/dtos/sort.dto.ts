import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';

import { SortDirection } from '../common.constant';

export class SortDto {
  @ApiProperty({
    required: false,
    enum: SortDirection,
    default: SortDirection.Asc,
  })
  @IsEnum(SortDirection)
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsOptional()
  public readonly sort?: SortDirection = SortDirection.Asc;
}
