import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommonModule } from '../common/common.module';
import { CaslModule } from '../casl/casl.module';

import { Product, ProductSchema } from './schemas/product.schema';
import {
  ProductWarrantyClaim,
  ProductWarrantyClaimSchema,
} from './schemas/product-warranty-claim.schema';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: ProductWarrantyClaim.name,
        schema: ProductWarrantyClaimSchema,
      },
    ]),
    CommonModule,
    CaslModule,
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
