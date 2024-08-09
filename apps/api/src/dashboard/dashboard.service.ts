import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { CommonService } from '../common/common.service';

import { WarrantyClaimStatus } from '../product/product.constant';
import { CreateProductDto } from '../product/dtos/create-product.dto';
import { ReadAllProductsDto } from '../product/dtos/read-all-products.dto';
import { UpdateProductDto } from '../product/dtos/update-product.dto';
import { ReadAllWarrantyClaimsDto } from '../product/dtos/read-all-warranty-claims.dto';
import { ProductService } from '../product/product.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly commonService: CommonService,
    private readonly productService: ProductService,
  ) {}

  public async createProduct(payload: CreateProductDto) {
    const createdProduct = await this.productService.create(payload);

    return this.commonService.successTimestamp({
      data: createdProduct,
    });
  }

  public async readProductById(id: string) {
    const existingProduct = await this.productService
      .readById(id)
      .lean()
      .exec();

    if (!existingProduct) {
      throw new UnprocessableEntityException('Product does not exist!');
    }

    return this.commonService.successTimestamp({
      data: existingProduct,
    });
  }

  public readAllProducts(queries: ReadAllProductsDto) {
    return this.productService.readAll(queries);
  }

  public updateProduct(id: string, payload: UpdateProductDto) {
    return this.productService.update(id, payload);
  }

  public deleteProduct(id: string) {
    return this.productService.delete(id);
  }

  public async readWarrantyClaimById(id: string) {
    const existingWarrantyClaim = await this.productService
      .readWarrantyClaimById(id)
      .lean()
      .exec();

    if (!existingWarrantyClaim) {
      throw new UnprocessableEntityException('Warranty claim does not exist!');
    }

    return this.commonService.successTimestamp({
      data: existingWarrantyClaim,
    });
  }

  public readAllWarrantyClaims(queries: ReadAllWarrantyClaimsDto) {
    return this.productService.readAllWarrantyClaims(queries);
  }

  public approveWarrantyClaim(id: string, approvedBy: string) {
    return this.productService.confirmWarrantyClaim(
      id,
      WarrantyClaimStatus.Approved,
      approvedBy,
    );
  }

  public rejectWarrantyClaim(id: string, rejectedBy: string) {
    return this.productService.confirmWarrantyClaim(
      id,
      WarrantyClaimStatus.Rejected,
      rejectedBy,
    );
  }
}
