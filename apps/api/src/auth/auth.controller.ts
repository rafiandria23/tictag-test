import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DocsTag } from '../common/common.constant';

import { UserSignUpDto } from './dtos/sign-up.dto';
import { UserSignInDto } from './dtos/sign-in.dto';
import { Public } from './auth.decorator';
import { AuthService } from './auth.service';

@Controller('/auth')
@ApiTags(DocsTag.Auth)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/staffs/sign-up')
  @HttpCode(HttpStatus.CREATED)
  public staffSignUp(@Body() payload: UserSignUpDto) {
    return this.authService.staffSignUp(payload);
  }

  @Public()
  @Post('/staffs/sign-in')
  @HttpCode(HttpStatus.CREATED)
  public staffSignIn(@Body() payload: UserSignInDto) {
    return this.authService.staffSignIn(payload);
  }

  @Public()
  @Post('/customers/sign-up')
  @HttpCode(HttpStatus.CREATED)
  public customerSignUp(@Body() payload: UserSignUpDto) {
    return this.authService.customerSignUp(payload);
  }

  @Public()
  @Post('/customers/sign-in')
  @HttpCode(HttpStatus.CREATED)
  public customerSignIn(@Body() payload: UserSignInDto) {
    return this.authService.customerSignIn(payload);
  }
}
