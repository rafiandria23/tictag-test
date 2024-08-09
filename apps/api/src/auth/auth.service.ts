import _ from 'lodash';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { CommonService } from '../common/common.service';
import { UserRole } from '../user/user.constant';
import { UserService } from '../user/user.service';

import { UserPassword } from './schemas/user-password.schema';
import { UserSignUpDto } from './dtos/sign-up.dto';
import { UserSignInDto } from './dtos/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserPassword.name)
    private readonly userPasswordModel: Model<UserPassword>,
    private readonly commonService: CommonService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  private async signUp(payload: UserSignUpDto, role: UserRole) {
    const existingUser = await this.userService
      .readByEmail(payload.email)
      .populate('password')
      .lean()
      .exec();

    if (existingUser !== null) {
      if (existingUser.role !== role) {
        throw new UnprocessableEntityException();
      }

      throw new UnprocessableEntityException('User already exists!');
    }

    const createdUserPassword = await this.userPasswordModel.create({
      hash: payload.password,
    });

    const createdUser = await this.userService.create(
      {
        ..._.omit(payload, ['password']),
        role,
      },
      createdUserPassword._id,
    );

    const accessToken = await this.jwtService.signAsync({
      id: createdUser._id,
      role,
    });

    return this.commonService.successTimestamp({
      data: {
        access_token: accessToken,
      },
    });
  }

  private async signIn(payload: UserSignInDto, role: UserRole) {
    const existingUser = await this.userService
      .readByEmail(payload.email)
      .populate('password')
      .lean()
      .exec();

    if (!existingUser) {
      throw new UnprocessableEntityException('User does not exist!');
    }

    if (existingUser.role !== role) {
      throw new UnprocessableEntityException();
    }

    if (!(await bcrypt.compare(payload.password, existingUser.password.hash))) {
      throw new UnprocessableEntityException('Wrong email or password!');
    }

    const accessToken = await this.jwtService.signAsync({
      id: existingUser._id,
      role,
    });

    return this.commonService.successTimestamp({
      data: {
        access_token: accessToken,
      },
    });
  }

  public staffSignUp(payload: UserSignUpDto) {
    return this.signUp(payload, UserRole.Staff);
  }

  public staffSignIn(payload: UserSignInDto) {
    return this.signIn(payload, UserRole.Staff);
  }

  public customerSignUp(payload: UserSignUpDto) {
    return this.signUp(payload, UserRole.Customer);
  }

  public customerSignIn(payload: UserSignInDto) {
    return this.signIn(payload, UserRole.Customer);
  }
}
