import _ from 'lodash';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { User, UserDocument } from '../../user/schemas/user.schema';

import { ProductWarrantyClaimStatus } from '../product.constant';
import { Product, ProductDocument } from './product.schema';

export type ProductWarrantyClaimDocument =
  HydratedDocument<ProductWarrantyClaim>;

@Schema({
  collection: 'product_warranty_claims',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class ProductWarrantyClaim {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    type: Types.ObjectId,
    ref: Product.name,
    required: true,
  })
  product: ProductDocument;

  @Prop({
    type: String,
    required: true,
    enum: _.values(ProductWarrantyClaimStatus),
    default: ProductWarrantyClaimStatus.Pending,
  })
  status: ProductWarrantyClaimStatus;

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  submitted_by: UserDocument;

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: false,
    default: null,
  })
  confirmed_by: UserDocument | null;

  @Prop({
    type: Date,
    required: false,
    default: null,
  })
  confirmed_at: Date | null;
}

export const ProductWarrantyClaimSchema =
  SchemaFactory.createForClass(ProductWarrantyClaim);
