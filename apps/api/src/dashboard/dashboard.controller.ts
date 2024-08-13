import {
  Controller,
  UseGuards,
  Post,
  Get,
  Put,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  Body,
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

import { DocsTag } from '../common/common.constant';
import { RawSuccessTimestampDto } from '../common/dtos/raw-success-timestamp.dto';
import { ReadAllMetadataDto } from '../common/dtos/read-all-metadata.dto';
import { ValidationErrorDto } from '../common/dtos/validation-error.dto';
import { ErrorMessageDto } from '../common/dtos/error-message.dto';
import { Action } from '../casl/casl.constant';
import { CheckPolicy } from '../casl/casl.decorator';
import { PolicyGuard } from '../casl/guards/policy.guard';
import { AuthUser } from '../auth/auth.interface';
import { Auth } from '../auth/auth.decorator';
import { Product } from '../product/schemas/product.schema';
import { WarrantyClaim } from '../product/schemas/warranty-claim.schema';
import { ProductDto } from '../product/dtos/product.dto';
import { WarrantyClaimDto } from '../product/dtos/warranty-claim.dto';
import { CreateProductDto } from '../product/dtos/create-product.dto';
import { ReadProductByIdDto } from '../product/dtos/read-product-by-id.dto';
import { ReadAllProductsDto } from '../product/dtos/read-all-products.dto';
import { UpdateProductDto } from '../product/dtos/update-product.dto';
import { ReadWarrantyClaimByIdDto } from '../product/dtos/read-warranty-claim-by-id.dto';
import { ReadAllWarrantyClaimsDto } from '../product/dtos/read-all-warranty-claims.dto';

import { DashboardService } from './dashboard.service';

@Controller('/dashboard')
@UseGuards(PolicyGuard)
@ApiTags(DocsTag.Dashboard)
@ApiBearerAuth()
@ApiExtraModels(
  RawSuccessTimestampDto,
  ReadAllMetadataDto,
  ValidationErrorDto,
  ErrorMessageDto,
  ProductDto,
  WarrantyClaimDto,
)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post('/products')
  @CheckPolicy((ability) => ability.can(Action.Create, Product))
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
              $ref: getSchemaPath(ProductDto),
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
  public createProduct(@Body() payload: CreateProductDto) {
    return this.dashboardService.createProduct(payload);
  }

  @Get('/products/:id')
  @CheckPolicy((ability) => ability.can(Action.Read, Product))
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
              $ref: getSchemaPath(ProductDto),
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
  public readProductById(@Param() params: ReadProductByIdDto) {
    return this.dashboardService.readProductById(params.id);
  }

  @Get('/products')
  @CheckPolicy((ability) => ability.can(Action.Read, Product))
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
                $ref: getSchemaPath(ProductDto),
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
  public readAllProducts(@Query() queries: ReadAllProductsDto) {
    return this.dashboardService.readAllProducts(queries);
  }

  @Put('/products/:id')
  @CheckPolicy((ability) => ability.can(Action.Update, Product))
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(RawSuccessTimestampDto),
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
  public updateProduct(
    @Param() params: ReadProductByIdDto,
    @Body() payload: UpdateProductDto,
  ) {
    return this.dashboardService.updateProduct(params.id, payload);
  }

  @Delete('/products/:id')
  @CheckPolicy((ability) => ability.can(Action.Delete, Product))
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(RawSuccessTimestampDto),
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
  public deleteProduct(@Param() params: ReadProductByIdDto) {
    return this.dashboardService.deleteProduct(params.id);
  }

  @Get('/warranty-claims/:id')
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
  public readWarrantyClaimById(@Param() params: ReadWarrantyClaimByIdDto) {
    return this.dashboardService.readWarrantyClaimById(params.id);
  }

  @Get('/warranty-claims')
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
  public readAllWarrantyClaims(@Query() queries: ReadAllWarrantyClaimsDto) {
    return this.dashboardService.readAllWarrantyClaims(queries);
  }

  @Patch('/warranty-claims/:id/approve')
  @CheckPolicy((ability) => ability.can(Action.Update, WarrantyClaim))
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(RawSuccessTimestampDto),
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
  public approveWarrantyClaim(
    @Auth() authUser: AuthUser,
    @Param() params: ReadWarrantyClaimByIdDto,
  ) {
    return this.dashboardService.approveWarrantyClaim(params.id, authUser.id);
  }

  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(RawSuccessTimestampDto),
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
  @Patch('/warranty-claims/:id/reject')
  @CheckPolicy((ability) => ability.can(Action.Update, WarrantyClaim))
  @HttpCode(HttpStatus.OK)
  public rejectWarrantyClaim(
    @Auth() authUser: AuthUser,
    @Param() params: ReadWarrantyClaimByIdDto,
  ) {
    return this.dashboardService.rejectWarrantyClaim(params.id, authUser.id);
  }
}
