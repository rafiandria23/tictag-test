import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommonModule } from '../common/common.module';
import { CaslModule } from '../casl/casl.module';

import { Product, ProductSchema } from './schemas/product.schema';
import {
  WarrantyClaim,
  WarrantyClaimSchema,
} from './schemas/warranty-claim.schema';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { WarrantyClaimController } from './warranty-claim.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: WarrantyClaim.name,
        schema: WarrantyClaimSchema,
      },
    ]),
    CommonModule,
    CaslModule,
  ],
  providers: [ProductService],
  controllers: [ProductController, WarrantyClaimController],
  exports: [ProductService],
})
export class ProductModule {}
