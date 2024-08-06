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

import { CommonService } from '../common/common.service';
import { Action } from '../casl/casl.constant';
import { CheckPolicy } from '../casl/casl.decorator';
import { PolicyGuard } from '../casl/guards/policy.guard';
import { AuthUser } from '../auth/auth.interface';
import { Auth } from '../auth/auth.decorator';

import { Product } from './schemas/product.schema';
import { ProductWarrantyClaim } from './schemas/product-warranty-claim.schema';
import { ReadProductByIdDto } from './dtos/read-product-by-id.dto';
import { ReadAllProductsDto } from './dtos/read-all-products.dto';
import { CreateProductWarrantyClaimDto } from './dtos/create-product-warranty-claim.dto';
import { ReadProductWarrantyClaimByIdDto } from './dtos/read-product-warranty-claim-by-id.dto';
import { ProductService } from './product.service';

@Controller('/products')
@UseGuards(PolicyGuard)
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly commonService: CommonService,
  ) {}

  @Get('/:id')
  @CheckPolicy((ability) => ability.can(Action.Read, Product))
  @HttpCode(HttpStatus.OK)
  public async readById(@Param() payload: ReadProductByIdDto) {
    const existingProduct = await this.productService.readById(payload.id);

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

  @Post('/warranty-claims')
  @CheckPolicy((ability) => ability.can(Action.Create, ProductWarrantyClaim))
  @HttpCode(HttpStatus.OK)
  public createWarrantyClaim(
    @Auth() authUser: AuthUser,
    @Body() payload: CreateProductWarrantyClaimDto,
  ) {
    return this.productService.createWarrantyClaim(authUser.id, payload);
  }

  @Get('/warranty-claims/:id')
  @CheckPolicy((ability) => ability.can(Action.Read, ProductWarrantyClaim))
  @HttpCode(HttpStatus.OK)
  public async readWarrantyClaimById(
    @Param() payload: ReadProductWarrantyClaimByIdDto,
  ) {
    const existingProductWarrantyClaim = await this.productService.readById(
      payload.id,
    );

    if (!existingProductWarrantyClaim) {
      throw new UnprocessableEntityException(
        'Product warranty claim does not exist!',
      );
    }

    return this.commonService.successTimestamp({
      data: existingProductWarrantyClaim,
    });
  }

  @Get('/warranty-claims')
  @CheckPolicy((ability) => ability.can(Action.Read, ProductWarrantyClaim))
  @HttpCode(HttpStatus.OK)
  public readAllWarrantyClaims() {}
}
