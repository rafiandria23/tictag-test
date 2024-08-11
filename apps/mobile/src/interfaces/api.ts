import type { Dayjs } from 'dayjs';

import type { SortDirection } from '../constants/api';

export interface SuccessTimestamp<MD = undefined, D = undefined> {
  success: boolean;
  timestamp: Dayjs | Date | string;
  metadata: MD;
  data: D;
}

export interface PaginationPayload {
  page?: number;
  page_size?: number;
}

export interface SortPayload<T> {
  sort?: SortDirection;
  sort_by?: T;
}

export interface ReadAllMetadata {
  total: number;
}
