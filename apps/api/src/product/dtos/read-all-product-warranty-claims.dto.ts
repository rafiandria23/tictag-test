import { IntersectionType, ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsMongoId } from 'class-validator';

import { PaginationDto } from '../../common/dtos/pagination.dto';
import { SortDto } from '../../common/dtos/sort.dto';

import {
  ProductWarrantyClaimSortProperty,
  ProductWarrantyClaimStatus,
} from '../product.constant';

export class ReadAllProductWarrantyClaimsDto extends IntersectionType(
  PaginationDto,
  SortDto,
) {
  @ApiProperty({
    required: false,
    enum: ProductWarrantyClaimSortProperty,
  })
  @IsEnum(ProductWarrantyClaimSortProperty)
  @IsString()
  @IsOptional()
  public readonly sort_by?: ProductWarrantyClaimSortProperty =
    ProductWarrantyClaimSortProperty.Name;

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

  @ApiProperty({
    required: false,
  })
  @IsMongoId()
  @IsString()
  @IsOptional()
  public readonly product?: string;

  @ApiProperty({
    required: false,
    enum: ProductWarrantyClaimStatus,
  })
  @IsEnum(ProductWarrantyClaimStatus)
  @IsString()
  @IsOptional()
  public readonly status?: ProductWarrantyClaimStatus =
    ProductWarrantyClaimStatus.Pending;

  @ApiProperty({
    required: false,
  })
  @IsMongoId()
  @IsString()
  @IsOptional()
  public readonly submitted_by?: string;

  @ApiProperty({
    required: false,
  })
  @IsMongoId()
  @IsString()
  @IsOptional()
  public readonly confirmed_by?: string;
}
