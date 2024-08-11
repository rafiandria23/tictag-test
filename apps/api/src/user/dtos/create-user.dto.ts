import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { Transform } from 'class-transformer';

import { UserRole } from '../user.constant';

export class CreateUserDto {
  @ApiProperty({
    required: true,
  })
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  public readonly first_name: string;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (!value ? null : value.trim()))
  @IsString()
  @IsOptional()
  public readonly last_name?: string;

  @ApiProperty({
    required: true,
    format: 'email',
  })
  @IsEmail()
  @Transform(({ value }) => value?.trim().toLowerCase())
  @IsString()
  @IsNotEmpty()
  public readonly email: string;

  @ApiProperty({
    required: true,
    enum: UserRole,
  })
  @IsEnum(UserRole)
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  public readonly role: UserRole;
}
