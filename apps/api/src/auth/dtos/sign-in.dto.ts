import { PickType } from '@nestjs/swagger';

import { UserSignUpDto } from './sign-up.dto';

export class UserSignInDto extends PickType(UserSignUpDto, [
  'email',
  'password',
] as const) {}
