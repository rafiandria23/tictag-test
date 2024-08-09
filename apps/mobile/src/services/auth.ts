import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { SuccessTimestamp } from '../interfaces/api';
import type {
  AuthToken,
  SignUpPayload,
  SignInPayload,
} from '../interfaces/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL}/auth/customers`,
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<
      SuccessTimestamp<undefined, AuthToken>,
      SignUpPayload
    >({
      query: (payload) => ({
        method: 'POST',
        url: '/sign-up',
        body: payload,
      }),
    }),
    signIn: builder.mutation<
      SuccessTimestamp<undefined, AuthToken>,
      SignInPayload
    >({
      query: (payload) => ({
        method: 'POST',
        url: '/sign-in',
        body: payload,
      }),
    }),
  }),
});
