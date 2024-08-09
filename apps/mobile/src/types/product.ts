import type { PaginationPayload, SortPayload } from '../interfaces/api';
import type { Product, WarrantyClaim } from '../interfaces/product';

export type ReadAllProductsPayload = PaginationPayload &
  SortPayload<
    Pick<Product, 'name' | 'created_at' | 'updated_at'> & { id: Product['_id'] }
  > &
  Partial<Pick<Product, 'name' | 'description'>>;

export type ReadAllWarrantyClaimsPayload = PaginationPayload &
  SortPayload<
    Pick<
      WarrantyClaim,
      'name' | 'confirmed_at' | 'created_at' | 'updated_at'
    > & { id: WarrantyClaim['_id'] }
  > &
  Partial<Pick<WarrantyClaim, 'name' | 'description' | 'status'>>;
