import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { SuccessTimestamp, ReadAllMetadata } from '../interfaces/api';
import type {
  Product,
  WarrantyClaim,
  CreateWarrantyClaimPayload,
} from '../interfaces/product';
import {
  ReadAllProductsPayload,
  ReadAllWarrantyClaimsPayload,
} from '../types/product';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL}/products`,
  }),
  endpoints: (builder) => ({
    readById: builder.query<SuccessTimestamp<undefined, Product>, string>({
      query: (id) => ({
        method: 'GET',
        url: `/${id}`,
      }),
    }),
    readAll: builder.query<
      SuccessTimestamp<ReadAllMetadata, Product[]>,
      ReadAllProductsPayload
    >({
      query: (payload) => ({
        method: 'GET',
        url: '/',
        params: payload,
      }),
    }),
  }),
});

export const warrantyClaimApi = createApi({
  reducerPath: 'warrantyClaimApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL}/warranty-claims`,
  }),
  endpoints: (builder) => ({
    create: builder.mutation<
      SuccessTimestamp<undefined, WarrantyClaim>,
      CreateWarrantyClaimPayload
    >({
      query: (payload) => ({
        method: 'POST',
        url: '/',
        body: payload,
      }),
    }),
    readById: builder.query<SuccessTimestamp<undefined, WarrantyClaim>, string>(
      {
        query: (id) => ({
          method: 'GET',
          url: `/${id}`,
        }),
      },
    ),
    readAll: builder.query<
      SuccessTimestamp<ReadAllMetadata, WarrantyClaim[]>,
      ReadAllWarrantyClaimsPayload
    >({
      query: (payload) => ({
        method: 'GET',
        url: '/',
        params: payload,
      }),
    }),
  }),
});
