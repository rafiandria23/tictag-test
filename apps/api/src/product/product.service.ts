import _ from 'lodash';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import { PaginationDto } from '../common/dtos/pagination.dto';
import { SortDto } from '../common/dtos/sort.dto';
import { CommonService } from '../common/common.service';

import { ProductWarrantyClaimStatus } from './product.constant';
import { Product } from './schemas/product.schema';
import { ProductWarrantyClaim } from './schemas/product-warranty-claim.schema';
import { CreateProductDto } from './dtos/create-product.dto';
import { ReadAllProductsDto } from './dtos/read-all-products.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CreateProductWarrantyClaimDto } from './dtos/create-product-warranty-claim.dto';
import { ReadAllProductWarrantyClaimsDto } from './dtos/read-all-product-warranty-claims.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    @InjectModel(ProductWarrantyClaim.name)
    private readonly productWarrantyClaimModel: Model<ProductWarrantyClaim>,
    private readonly commonService: CommonService,
  ) {}

  public create(payload: CreateProductDto) {
    return this.productModel.create({
      name: payload.name,
      description: payload.description,
    });
  }

  public readById(id: string) {
    return this.productModel.findById(id);
  }

  public async readAll(queries: ReadAllProductsDto) {
    const filters: FilterQuery<Product> = {};

    const candidates = _.omit(queries, [
      ..._.keys(new PaginationDto()),
      ..._.keys(new SortDto()),
      'sort_by',
    ]);

    if (!_.isEmpty(candidates)) {
      _.forOwn(candidates, (candidateValue, candidateKey) => {
        _.set(filters, candidateKey, {
          $reges: new RegExp(candidateValue as string, 'i'),
        });
      });
    }

    const [total, existingProducts] = await Promise.all([
      this.productModel.countDocuments(filters),
      this.productModel
        .find(filters)
        .skip(queries.page_size * (queries.page - 1))
        .limit(queries.page_size)
        .sort({
          [queries.sort_by]: queries.sort,
        })
        .exec(),
    ]);

    return this.commonService.successTimestamp({
      metadata: {
        total,
      },
      data: existingProducts,
    });
  }

  public async update(id: string, payload: UpdateProductDto) {
    const updatedProduct = await this.productWarrantyClaimModel
      .updateOne(
        {
          _id: id,
        },
        {
          name: payload.name,
          description: payload.description,
        },
        {
          upsert: false,
        },
      )
      .exec();

    if (!updatedProduct.matchedCount) {
      throw new UnprocessableEntityException('Product does not exist!');
    }

    return this.commonService.successTimestamp();
  }

  public async delete(id: string) {
    const existingProduct = await this.readById(id).select('_id').exec();

    if (!existingProduct) {
      throw new UnprocessableEntityException('Product is not found!');
    }

    await Promise.all([
      this.productWarrantyClaimModel.deleteMany({
        product: existingProduct._id,
      }),
      existingProduct.deleteOne(),
    ]);

    return this.commonService.successTimestamp();
  }

  public async createWarrantyClaim(
    submittedBy: string,
    payload: CreateProductWarrantyClaimDto,
  ) {
    const existingProduct = await this.readById(payload.product)
      .select('_id')
      .exec();

    if (!existingProduct) {
      throw new UnprocessableEntityException('Product does not exist!');
    }

    const createdProductWarrantyClaim =
      await this.productWarrantyClaimModel.create({
        name: payload.name,
        description: payload.description,
        product: existingProduct._id,
        submitted_by: submittedBy,
      });

    return this.commonService.successTimestamp({
      data: createdProductWarrantyClaim,
    });
  }

  public async readWarrantyClaimById(id: string) {
    return this.productWarrantyClaimModel
      .findById(id)
      .populate(['product', 'submitted_by', 'confirmed_by']);
  }

  public async readAllWarrantyClaims(queries: ReadAllProductWarrantyClaimsDto) {
    const filters: FilterQuery<ProductWarrantyClaim> = {};

    const candidates = _.omit(queries, [
      ..._.keys(new PaginationDto()),
      ..._.keys(new SortDto()),
      'sort_by',
    ]);

    if (!_.isEmpty(candidates)) {
      _.forOwn(candidates, (candidateValue, candidateKey) => {
        _.set(filters, candidateKey, {
          $reges: new RegExp(candidateValue as string, 'i'),
        });
      });
    }

    const [total, existingProductWarrantyClaims] = await Promise.all([
      this.productWarrantyClaimModel.countDocuments(filters),
      this.productWarrantyClaimModel
        .find(filters)
        .skip(queries.page_size * (queries.page - 1))
        .limit(queries.page_size)
        .sort({
          [queries.sort_by]: queries.sort,
        })
        .exec(),
    ]);

    return this.commonService.successTimestamp({
      metadata: {
        total,
      },
      data: existingProductWarrantyClaims,
    });
  }

  public async confirmWarrantyClaim(
    id: string,
    confirmation: ProductWarrantyClaimStatus,
    confirmedBy: string,
  ) {
    const existingProductWarrantyClaim = await this.readWarrantyClaimById(id);

    if (!existingProductWarrantyClaim) {
      throw new UnprocessableEntityException(
        'Product warranty claim does not exist!',
      );
    }

    if (
      existingProductWarrantyClaim.status === ProductWarrantyClaimStatus.Pending
    ) {
      _.set(existingProductWarrantyClaim, 'status', confirmation);
      _.set(existingProductWarrantyClaim, 'confirmed_by', confirmedBy);
      _.set(existingProductWarrantyClaim, 'confirmed_at', new Date());

      await existingProductWarrantyClaim.save();

      return this.commonService.successTimestamp({
        data: existingProductWarrantyClaim,
      });
    }

    throw new UnprocessableEntityException(
      `Product warranty claim is already ${existingProductWarrantyClaim.status}!`,
    );
  }
}
