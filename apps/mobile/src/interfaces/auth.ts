import type { User } from './user';

export interface AuthToken {
  access_token: string;
}

export interface SignUpPayload extends Pick<User, 'first_name' | 'email'> {
  last_name: string;
  password: string;
}
