import { OmitType, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

import { PasswordLength } from '../auth.constant';

import { CreateUserDto } from '../../user/dtos/create-user.dto';

export class UserSignUpDto extends OmitType(CreateUserDto, ['role'] as const) {
  @ApiProperty({
    minLength: PasswordLength.Min,
    format: 'password',
  })
  @MinLength(PasswordLength.Min)
  @IsString()
  @IsNotEmpty()
  public readonly password: string;
}
