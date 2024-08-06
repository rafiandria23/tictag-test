import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

import { PaginationPage, PaginationSize } from '../common.constant';

export class PaginationDto {
  @ApiProperty({
    required: false,
    minimum: PaginationPage.MIN,
    default: PaginationPage.MIN,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @Min(PaginationPage.MIN)
  @IsNumber()
  @IsOptional()
  public readonly page?: number = PaginationPage.MIN;

  @ApiProperty({
    required: false,
    minimum: PaginationSize.MIN,
    maximum: PaginationSize.MAX,
    default: PaginationSize.DEFAULT,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @Max(PaginationSize.MAX)
  @Min(PaginationSize.MIN)
  @IsNumber()
  @IsOptional()
  public readonly page_size?: number = PaginationSize.DEFAULT;
}
