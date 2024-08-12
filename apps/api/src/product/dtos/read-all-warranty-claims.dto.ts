import { IntersectionType, ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsMongoId } from 'class-validator';
import { Transform } from 'class-transformer';

import { PaginationDto } from '../../common/dtos/pagination.dto';
import { SortDto } from '../../common/dtos/sort.dto';

import {
  WarrantyClaimSortProperty,
  WarrantyClaimStatus,
} from '../product.constant';

export class ReadAllWarrantyClaimsDto extends IntersectionType(
  PaginationDto,
  SortDto,
) {
  @ApiProperty({
    required: false,
    enum: WarrantyClaimSortProperty,
    default: WarrantyClaimSortProperty.Name,
  })
  @IsEnum(WarrantyClaimSortProperty)
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsOptional()
  public readonly sort_by?: WarrantyClaimSortProperty =
    WarrantyClaimSortProperty.Name;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsOptional()
  public readonly name?: string;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsOptional()
  public readonly description?: string;

  @ApiProperty({
    required: false,
  })
  @IsMongoId()
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsOptional()
  public readonly product?: string;

  @ApiProperty({
    required: false,
    enum: WarrantyClaimStatus,
    default: WarrantyClaimStatus.Pending,
  })
  @IsEnum(WarrantyClaimStatus)
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsOptional()
  public readonly status?: WarrantyClaimStatus = WarrantyClaimStatus.Pending;

  @ApiProperty({
    required: false,
  })
  @IsMongoId()
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsOptional()
  public readonly submitted_by?: string;

  @ApiProperty({
    required: false,
  })
  @IsMongoId()
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsOptional()
  public readonly confirmed_by?: string;
}
