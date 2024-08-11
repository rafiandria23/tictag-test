import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as SecureStore from 'expo-secure-store';

import type { SuccessTimestamp } from '../interfaces/api';
import type { User } from '../interfaces/user';
import { AuthSecureStoreKey } from '../constants/auth';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL}/users`,
    prepareHeaders: async (headers) => {
      const accessToken = await SecureStore.getItemAsync(
        AuthSecureStoreKey.AccessToken,
      );

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
