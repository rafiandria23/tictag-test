import { IntersectionType, ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';

import { PaginationDto } from '../../common/dtos/pagination.dto';
import { SortDto } from '../../common/dtos/sort.dto';

import { ProductSortProperty } from '../product.constant';

export class ReadAllProductsDto extends IntersectionType(
  PaginationDto,
  SortDto,
) {
  @ApiProperty({
    required: false,
    enum: ProductSortProperty,
  })
  @IsEnum(ProductSortProperty)
  @IsString()
  @IsOptional()
  public readonly sort_by?: ProductSortProperty = ProductSortProperty.Name;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  public readonly name?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  public readonly description?: string;
}
