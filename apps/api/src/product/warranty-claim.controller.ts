import {
  Controller,
  UseGuards,
  Post,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  Body,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiUnprocessableEntityResponse,
  ApiInternalServerErrorResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { Types } from 'mongoose';

import { DocsTag } from '../common/common.constant';
import { RawSuccessTimestampDto } from '../common/dtos/raw-success-timestamp.dto';
import { ReadAllMetadataDto } from '../common/dtos/read-all-metadata.dto';
import { ValidationErrorDto } from '../common/dtos/validation-error.dto';
import { ErrorMessageDto } from '../common/dtos/error-message.dto';
import { CommonService } from '../common/common.service';
import { Action } from '../casl/casl.constant';
import { CheckPolicy } from '../casl/casl.decorator';
import { PolicyGuard } from '../casl/guards/policy.guard';
import { AuthUser } from '../auth/auth.interface';
import { Auth } from '../auth/auth.decorator';

import { WarrantyClaim } from './schemas/warranty-claim.schema';
import { WarrantyClaimDto } from './dtos/warranty-claim.dto';
import { CreateWarrantyClaimDto } from './dtos/create-warranty-claim.dto';
import { ReadWarrantyClaimByIdDto } from './dtos/read-warranty-claim-by-id.dto';
import { CustomerReadAllWarrantyClaimsDto } from './dtos/customer-read-all-warranty-claims.dto';
import { ProductService } from './product.service';

@Controller('/warranty-claims')
@UseGuards(PolicyGuard)
@ApiTags(DocsTag.Product)
@ApiBearerAuth()
@ApiExtraModels(
  RawSuccessTimestampDto,
  ReadAllMetadataDto,
  ValidationErrorDto,
  ErrorMessageDto,
  WarrantyClaimDto,
)
export class WarrantyClaimController {
  constructor(
    private readonly productService: ProductService,
    private readonly commonService: CommonService,
  ) {}

  @Post('/')
  @CheckPolicy((ability) => ability.can(Action.Create, WarrantyClaim))
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
              $ref: getSchemaPath(WarrantyClaimDto),
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
  @ApiUnauthorizedResponse({
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
  @ApiForbiddenResponse({
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
  public create(
    @Auth() authUser: AuthUser,
    @Body() payload: CreateWarrantyClaimDto,
  ) {
    return this.productService.createWarrantyClaim(authUser.id, payload);
  }

  @Get('/:id')
  @CheckPolicy((ability) => ability.can(Action.Read, WarrantyClaim))
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
              $ref: getSchemaPath(WarrantyClaimDto),
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
  @ApiUnauthorizedResponse({
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
  @ApiForbiddenResponse({
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
  public async readById(
    @Auth() authUser: AuthUser,
    @Param() params: ReadWarrantyClaimByIdDto,
  ) {
    const existingWarrantyClaim = await this.productService
      .readWarrantyClaimById(params.id)
      .where({
        submitted_by: new Types.ObjectId(authUser.id),
      })
      .lean()
      .exec();

    if (!existingWarrantyClaim) {
      throw new UnprocessableEntityException('Warranty claim does not exist!');
    }

    return this.commonService.successTimestamp({
      data: existingWarrantyClaim,
    });
  }

  @Get('/')
  @CheckPolicy((ability) => ability.can(Action.Read, WarrantyClaim))
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
            metadata: {
              $ref: getSchemaPath(ReadAllMetadataDto),
            },
            data: {
              type: 'array',
              items: {
                $ref: getSchemaPath(WarrantyClaimDto),
              },
            },
          },
          required: ['metadata', 'data'],
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
  @ApiUnauthorizedResponse({
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
  @ApiForbiddenResponse({
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
  public readAll(
    @Auth() authUser: AuthUser,
    @Query() queries: CustomerReadAllWarrantyClaimsDto,
  ) {
    return this.productService.readAllWarrantyClaims({
      ...queries,
      submitted_by: authUser.id,
    });
  }
}
