import type { Timestamp } from '../types/date';
import type { User } from '../interfaces/user';
import { WarrantyClaimStatus } from '../constants/product';

export interface Product {
  _id: string;
  name: string;
  description: string;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface WarrantyClaim {
  _id: string;
  name: string;
  description: string;
  product: Product;
  status: WarrantyClaimStatus;
  submitted_by: User;
  confirmed_by: User;
  confirmed_at: Timestamp;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface CreateWarrantyClaimPayload
  extends Pick<WarrantyClaim, 'name' | 'description'> {
  product: Product['_id'];
}
