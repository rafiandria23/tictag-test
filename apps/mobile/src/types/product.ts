import type { PaginationPayload, SortPayload } from '../interfaces/api';
import type { Product, WarrantyClaim } from '../interfaces/product';
import {
  ProductSortProperty,
  WarrantyClaimSortProperty,
} from '../constants/product';

export type ReadAllProductsPayload = PaginationPayload &
  SortPayload<ProductSortProperty> &
  Partial<Pick<Product, 'name' | 'description'>>;

export type ReadAllWarrantyClaimsPayload = PaginationPayload &
  SortPayload<WarrantyClaimSortProperty> &
  Partial<Pick<WarrantyClaim, 'name' | 'description' | 'status'>>;
