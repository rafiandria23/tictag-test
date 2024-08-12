import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
  ApiInternalServerErrorResponse,
  getSchemaPath,
} from '@nestjs/swagger';

import { DocsTag } from '../common/common.constant';
import { RawSuccessTimestampDto } from '../common/dtos/raw-success-timestamp.dto';
import { ValidationErrorDto } from '../common/dtos/validation-error.dto';
import { ErrorMessageDto } from '../common/dtos/error-message.dto';
import { CommonService } from '../common/common.service';
import { AuthUser } from '../auth/auth.interface';
import { Auth } from '../auth/auth.decorator';

import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('/users')
@ApiTags(DocsTag.User)
@ApiBearerAuth()
@ApiExtraModels(
  RawSuccessTimestampDto,
  ValidationErrorDto,
  ErrorMessageDto,
  UserDto,
)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly commonService: CommonService,
  ) {}

  @Get('/me')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(RawSuccessTimestampDto),
        },
        {
          type: 'object',
          properties: {
            data: {
              $ref: getSchemaPath(UserDto),
            },
          },
          required: ['data'],
        },
      ],
    },
  })
  @ApiUnprocessableEntityResponse({
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(RawSuccessTimestampDto),
        },
        {
          type: 'object',
          properties: {
            data: {
              $ref: getSchemaPath(ErrorMessageDto),
            },
          },
          required: ['data'],
        },
      ],
    },
  })
  @ApiInternalServerErrorResponse({
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(RawSuccessTimestampDto),
        },
        {
          type: 'object',
          properties: {
            data: {
              $ref: getSchemaPath(ErrorMessageDto),
            },
          },
          required: ['data'],
        },
      ],
    },
  })
  public async me(@Auth() authUser: AuthUser) {
    const existingUser = await this.userService
      .readById(authUser.id)
      .select('-password')
      .lean()
      .exec();

    if (!existingUser) {
      throw new UnprocessableEntityException('User does not exist!');
    }

    return this.commonService.successTimestamp({
      data: existingUser,
    });
  }
}
