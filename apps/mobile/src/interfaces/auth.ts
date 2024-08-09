import type { User } from './user';

export interface AuthToken {
  access_token: string;
}

export interface SignUpPayload extends Omit<User, '_id'> {
  password: string;
}

export type SignInPayload = Pick<SignUpPayload, 'email' | 'password'>;
