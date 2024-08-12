import { ApiProperty } from '@nestjs/swagger';
import { Dayjs } from 'dayjs';

import { UserRole } from '../user.constant';

export class UserDto {
  @ApiProperty({
    required: true,
  })
  public readonly _id: string;

  @ApiProperty({
    required: true,
  })
  public readonly first_name: string;

  @ApiProperty({
    required: true,
    nullable: true,
  })
  public readonly last_name: string | null;

  @ApiProperty({
    required: true,
  })
  public readonly email: string;

  @ApiProperty({
    required: true,
    enum: UserRole,
  })
  public readonly role: UserRole;

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
