import _ from 'lodash';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import { PaginationDto } from '../common/dtos/pagination.dto';
import { SortDto } from '../common/dtos/sort.dto';
import { CommonService } from '../common/common.service';

import { ProductWarrantyClaimStatus } from '../product/product.constant';
import { Product } from '../product/schemas/product.schema';
import { ProductWarrantyClaim } from '../product/schemas/product-warranty-claim.schema';
import { CreateProductDto } from '../product/dtos/create-product.dto';
import { ReadAllProductsDto } from '../product/dtos/read-all-products.dto';
import { UpdateProductDto } from '../product/dtos/update-product.dto';
import { CreateProductWarrantyClaimDto } from '../product/dtos/create-product-warranty-claim.dto';
import { ProductService } from '../product/product.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly commonService: CommonService,
    private readonly productService: ProductService,
  ) {}

  public createProduct(payload: CreateProductDto) {
    return this.productService.create(payload);
  }

  public readProductById() {}

  public readAllProducts() {}

  public updateProduct() {}

  public deleteProduct() {}

  public readProductWarrantyClaimById() {}

  public readAllProductWarrantyClaims() {}

  public approveProductWarrantyClaim(id: string, approvedBy: string) {
    return this.productService.confirmWarrantyClaim(
      id,
      ProductWarrantyClaimStatus.Approved,
      approvedBy,
    );
  }

  public rejectProductWarrantyClaim(id: string, rejectedBy: string) {
    return this.productService.confirmWarrantyClaim(
      id,
      ProductWarrantyClaimStatus.Rejected,
      rejectedBy,
    );
  }
}
