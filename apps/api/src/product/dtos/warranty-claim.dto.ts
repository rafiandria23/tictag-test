import { ApiProperty } from '@nestjs/swagger';
import { Dayjs } from 'dayjs';

import { UserDto } from '../../user/dtos/user.dto';

import { WarrantyClaimStatus } from '../product.constant';
import { ProductDto } from './product.dto';

export class WarrantyClaimDto {
  @ApiProperty({
    required: true,
  })
  public readonly _id: string;

  @ApiProperty({
    required: true,
  })
  public readonly name: string;

  @ApiProperty({
    required: true,
  })
  public readonly description: string;

  @ApiProperty({
    type: () => ProductDto,
    required: true,
  })
  public readonly product: ProductDto;

  @ApiProperty({
    required: true,
    enum: WarrantyClaimStatus,
  })
  public readonly status: WarrantyClaimStatus;

  @ApiProperty({
    type: () => UserDto,
    required: true,
  })
  public readonly submitted_by: UserDto;

  @ApiProperty({
    type: () => UserDto,
    required: true,
    nullable: true,
  })
  public readonly confirmed_by: UserDto;

  @ApiProperty({
    type: String,
    format: 'date-time',
    required: true,
    nullable: true,
  })
  public readonly confirmed_at: Dayjs | Date | string;

  @ApiProperty({
    type: String,
    format: 'date-time',
    required: true,
  })
  public readonly created_at: Dayjs | Date | string;

  @ApiProperty({
    type: String,
    format: 'date-time',
    required: true,
  })
  public readonly updated_at: Dayjs | Date | string;
}
