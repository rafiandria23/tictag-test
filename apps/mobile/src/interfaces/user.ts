import type { Timestamp } from '../types/date';

export interface User {
  _id: string;
  first_name: string;
  last_name: string | null;
  email: string;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface UserState {
  me: User | null;
}
