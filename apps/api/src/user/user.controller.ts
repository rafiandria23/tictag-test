import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';

import { CommonService } from '../common/common.service';
import { AuthUser } from '../auth/auth.interface';
import { Auth } from '../auth/auth.decorator';

import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly commonService: CommonService,
  ) {}

  @Get('/me')
  @HttpCode(HttpStatus.OK)
  public async me(@Auth() authUser: AuthUser) {
    const existingUser = await this.userService
      .readById(authUser.id)
      .select('-password')
      .exec();

    if (!existingUser) {
      throw new UnprocessableEntityException('User does not exist!');
    }

    return this.commonService.successTimestamp({
      data: existingUser,
    });
  }
}
