import {
  Controller,
  UseGuards,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
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
import { CommonService } from '../common/common.service';
import { Action } from '../casl/casl.constant';
import { CheckPolicy } from '../casl/casl.decorator';
import { PolicyGuard } from '../casl/guards/policy.guard';

import { Product } from './schemas/product.schema';
import { ProductDto } from './dtos/product.dto';
import { ReadProductByIdDto } from './dtos/read-product-by-id.dto';
import { ReadAllProductsDto } from './dtos/read-all-products.dto';
import { ProductService } from './product.service';

@Controller('/products')
@UseGuards(PolicyGuard)
@ApiTags(DocsTag.Product)
@ApiBearerAuth()
@ApiExtraModels(
  RawSuccessTimestampDto,
  ReadAllMetadataDto,
  ValidationErrorDto,
  ErrorMessageDto,
  ProductDto,
)
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly commonService: CommonService,
  ) {}

  @Get('/:id')
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
  public async readById(@Param() params: ReadProductByIdDto) {
    const existingProduct = await this.productService
      .readById(params.id)
      .lean()
      .exec();

    if (!existingProduct) {
      throw new UnprocessableEntityException('Product does not exist!');
    }

    return this.commonService.successTimestamp({
      data: existingProduct,
    });
  }

  @Get('/')
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
  public readAll(@Query() queries: ReadAllProductsDto) {
    return this.productService.readAll(queries);
  }
}
