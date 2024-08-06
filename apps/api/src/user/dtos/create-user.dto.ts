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
  @IsString()
  @IsNotEmpty()
  public readonly first_name: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  public readonly last_name?: string;

  @ApiProperty({
    required: true,
    format: 'email',
  })
  @Transform(({ value }) => value?.trim().toLowerCase())
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  public readonly email: string;

  @ApiProperty({
    required: true,
    enum: UserRole,
  })
  @IsEnum(UserRole)
  @IsString()
  @IsNotEmpty()
  public readonly role: UserRole;
}
