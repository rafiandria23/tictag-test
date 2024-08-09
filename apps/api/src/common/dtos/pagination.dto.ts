import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

import { PaginationPage, PaginationSize } from '../common.constant';

export class PaginationDto {
  @ApiProperty({
    required: false,
    minimum: PaginationPage.Min,
    default: PaginationPage.Min,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @Min(PaginationPage.Min)
  @IsNumber()
  @IsOptional()
  public readonly page?: number = PaginationPage.Min;

  @ApiProperty({
    required: false,
    minimum: PaginationSize.Min,
    maximum: PaginationSize.Max,
    default: PaginationSize.Default,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @Max(PaginationSize.Max)
  @Min(PaginationSize.Min)
  @IsNumber()
  @IsOptional()
  public readonly page_size?: number = PaginationSize.Default;
}
