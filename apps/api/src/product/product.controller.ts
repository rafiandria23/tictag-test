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
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { DocsTag } from '../common/common.constant';
import { CommonService } from '../common/common.service';
import { Action } from '../casl/casl.constant';
import { CheckPolicy } from '../casl/casl.decorator';
import { PolicyGuard } from '../casl/guards/policy.guard';

import { Product } from './schemas/product.schema';
import { ReadProductByIdDto } from './dtos/read-product-by-id.dto';
import { ReadAllProductsDto } from './dtos/read-all-products.dto';
import { ProductService } from './product.service';

@Controller('/products')
@UseGuards(PolicyGuard)
@ApiTags(DocsTag.Product)
@ApiBearerAuth()
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly commonService: CommonService,
  ) {}

  @Get('/:id')
  @CheckPolicy((ability) => ability.can(Action.Read, Product))
  @HttpCode(HttpStatus.OK)
  public async readById(@Param() params: ReadProductByIdDto) {
    const existingProduct = await this.productService
      .readById(params.id)
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
  public readAll(@Query() queries: ReadAllProductsDto) {
    return this.productService.readAll(queries);
  }
}
