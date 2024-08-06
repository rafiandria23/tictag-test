import { Request } from 'express';

import { UserRole } from '../user/user.constant';

export interface AuthUser {
  id: string;
  role: UserRole;
}

export interface AuthRequest extends Request {
  user: AuthUser;
}
