import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiExtraModels,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnprocessableEntityResponse,
  ApiInternalServerErrorResponse,
  getSchemaPath,
} from '@nestjs/swagger';

import { DocsTag } from '../common/common.constant';
import { RawSuccessTimestampDto } from '../common/dtos/raw-success-timestamp.dto';
import { ValidationErrorDto } from '../common/dtos/validation-error.dto';
import { ErrorMessageDto } from '../common/dtos/error-message.dto';

import { AuthTokenDto } from './dtos/auth-token.dto';
import { UserSignUpDto } from './dtos/sign-up.dto';
import { UserSignInDto } from './dtos/sign-in.dto';
import { Public } from './auth.decorator';
import { AuthService } from './auth.service';

@Controller('/auth')
@ApiTags(DocsTag.Auth)
@ApiExtraModels(
  RawSuccessTimestampDto,
  AuthTokenDto,
  ValidationErrorDto,
  ErrorMessageDto,
)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/staffs/sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(RawSuccessTimestampDto),
        },
        {
          type: 'object',
          properties: {
            data: {
              $ref: getSchemaPath(AuthTokenDto),
            },
          },
          required: ['data'],
        },
      ],
    },
  })
  @ApiBadRequestResponse({
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(RawSuccessTimestampDto),
        },
        {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: {
                $ref: getSchemaPath(ValidationErrorDto),
              },
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
  public staffSignUp(@Body() payload: UserSignUpDto) {
    return this.authService.staffSignUp(payload);
  }

  @Public()
  @Post('/staffs/sign-in')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(RawSuccessTimestampDto),
        },
        {
          type: 'object',
          properties: {
            data: {
              $ref: getSchemaPath(AuthTokenDto),
            },
          },
          required: ['data'],
        },
      ],
    },
  })
  @ApiBadRequestResponse({
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(RawSuccessTimestampDto),
        },
        {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: {
                $ref: getSchemaPath(ValidationErrorDto),
              },
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
  public staffSignIn(@Body() payload: UserSignInDto) {
    return this.authService.staffSignIn(payload);
  }

  @Public()
  @Post('/customers/sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(RawSuccessTimestampDto),
        },
        {
          type: 'object',
          properties: {
            data: {
              $ref: getSchemaPath(AuthTokenDto),
            },
          },
          required: ['data'],
        },
      ],
    },
  })
  @ApiBadRequestResponse({
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(RawSuccessTimestampDto),
        },
        {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: {
                $ref: getSchemaPath(ValidationErrorDto),
              },
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
  public customerSignUp(@Body() payload: UserSignUpDto) {
    return this.authService.customerSignUp(payload);
  }

  @Public()
  @Post('/customers/sign-in')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(RawSuccessTimestampDto),
        },
        {
          type: 'object',
          properties: {
            data: {
              $ref: getSchemaPath(AuthTokenDto),
            },
          },
          required: ['data'],
        },
      ],
    },
  })
  @ApiBadRequestResponse({
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(RawSuccessTimestampDto),
        },
        {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: {
                $ref: getSchemaPath(ValidationErrorDto),
              },
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
  public customerSignIn(@Body() payload: UserSignInDto) {
    return this.authService.customerSignIn(payload);
  }
}
