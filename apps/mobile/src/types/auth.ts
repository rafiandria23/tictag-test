import type { SignUpPayload } from '../interfaces/auth';

export type SignInPayload = Pick<SignUpPayload, 'email' | 'password'>;
