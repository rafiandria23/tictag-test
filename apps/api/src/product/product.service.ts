import _ from 'lodash';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, FilterQuery } from 'mongoose';
import dayjs from 'dayjs';

import { PaginationDto } from '../common/dtos/pagination.dto';
import { SortDto } from '../common/dtos/sort.dto';
import { CommonService } from '../common/common.service';

import {
  WarrantyClaimStatus,
  ProductSortProperty,
  WarrantyClaimSortProperty,
} from './product.constant';
import { Product } from './schemas/product.schema';
import { WarrantyClaim } from './schemas/warranty-claim.schema';
import { CreateProductDto } from './dtos/create-product.dto';
import { ReadAllProductsDto } from './dtos/read-all-products.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CreateWarrantyClaimDto } from './dtos/create-warranty-claim.dto';
import { ReadAllWarrantyClaimsDto } from './dtos/read-all-warranty-claims.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    @InjectModel(WarrantyClaim.name)
    private readonly warrantyClaimModel: Model<WarrantyClaim>,
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
        _.set(filters, candidateKey, new RegExp(candidateValue as string, 'i'));
      });
    }

    const [total, existingProducts] = await Promise.all([
      this.productModel.countDocuments(filters),
      this.productModel
        .find(filters)
        .skip(queries.page_size * (queries.page - 1))
        .limit(queries.page_size)
        .sort({
          [queries.sort_by === ProductSortProperty.Id
            ? '_id'
            : queries.sort_by]: queries.sort,
        })
        .lean()
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
    const { modifiedCount } = await this.productModel
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

    if (!modifiedCount) {
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
      this.warrantyClaimModel
        .deleteMany({
          product: existingProduct._id,
        })
        .exec(),
      existingProduct.deleteOne().exec(),
    ]);

    return this.commonService.successTimestamp();
  }

  public async createWarrantyClaim(
    submittedBy: string,
    payload: CreateWarrantyClaimDto,
  ) {
    const existingProduct = await this.readById(payload.product)
      .select('_id')
      .lean()
      .exec();

    if (!existingProduct) {
      throw new UnprocessableEntityException('Product does not exist!');
    }

    const createdWarrantyClaim = await this.warrantyClaimModel.create({
      name: payload.name,
      description: payload.description,
      product: existingProduct._id,
      submitted_by: new Types.ObjectId(submittedBy),
    });

    return this.commonService.successTimestamp({
      data: createdWarrantyClaim,
    });
  }

  public readWarrantyClaimById(id: string) {
    return this.warrantyClaimModel
      .findById(id)
      .populate('product')
      .populate('submitted_by', '-password')
      .populate('confirmed_by', '-password');
  }

  public async readAllWarrantyClaims(queries: ReadAllWarrantyClaimsDto) {
    const filters: FilterQuery<WarrantyClaim> = {};

    const candidates = _.omit(queries, [
      ..._.keys(new PaginationDto()),
      ..._.keys(new SortDto()),
      'sort_by',
    ]);

    if (!_.isEmpty(candidates)) {
      const refCandidateKeys = ['product', 'submitted_by', 'confirmed_by'];

      _.forOwn(candidates, (candidateValue, candidateKey) => {
        _.set(
          filters,
          candidateKey,
          refCandidateKeys.includes(candidateKey)
            ? new Types.ObjectId(candidateValue)
            : new RegExp(candidateValue as string, 'i'),
        );
      });
    }

    const [total, existingWarrantyClaims] = await Promise.all([
      this.warrantyClaimModel.countDocuments(filters),
      this.warrantyClaimModel
        .find(filters)
        .skip(queries.page_size * (queries.page - 1))
        .limit(queries.page_size)
        .sort({
          [queries.sort_by === WarrantyClaimSortProperty.Id
            ? '_id'
            : queries.sort_by]: queries.sort,
        })
        .populate('product')
        .populate('submitted_by', '-password')
        .populate('confirmed_by', '-password')
        .lean()
        .exec(),
    ]);

    return this.commonService.successTimestamp({
      metadata: {
        total,
      },
      data: existingWarrantyClaims,
    });
  }

  public async confirmWarrantyClaim(
    id: string,
    confirmation: WarrantyClaimStatus,
    confirmedBy: string,
  ) {
    const existingWarrantyClaim = await this.readWarrantyClaimById(id).exec();

    if (!existingWarrantyClaim) {
      throw new UnprocessableEntityException('Warranty claim does not exist!');
    }

    if (existingWarrantyClaim.status === WarrantyClaimStatus.Pending) {
      _.set(existingWarrantyClaim, 'status', confirmation);
      _.set(
        existingWarrantyClaim,
        'confirmed_by',
        new Types.ObjectId(confirmedBy),
      );
      _.set(existingWarrantyClaim, 'confirmed_at', dayjs());

      await existingWarrantyClaim.save();

      return this.commonService.successTimestamp();
    }

    throw new UnprocessableEntityException(
      `Warranty claim is already ${existingWarrantyClaim.status}!`,
    );
  }
}
