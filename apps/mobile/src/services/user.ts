import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { SuccessTimestamp } from '../interfaces/api';
import type { User } from '../interfaces/user';
import { AuthStorageKey } from '../constants/auth';
import Storage from '../utils/storage';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL}/users`,
    prepareHeaders: async (headers) => {
      const accessToken = await Storage.getItem(AuthStorageKey.AccessToken);

      if (accessToken !== null) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    me: builder.query<SuccessTimestamp<undefined, User>, void>({
      query: () => ({
        method: 'GET',
        url: '/me',
      }),
    }),
  }),
});
