import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { SuccessTimestamp } from '../interfaces/api';
import type { User } from '../interfaces/user';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL}/users`,
  }),
  endpoints: (builder) => ({
    me: builder.query<SuccessTimestamp<undefined, User>, undefined>({
      query: () => ({
        method: 'GET',
        url: '/me',
      }),
    }),
  }),
});
