import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { authApi } from '../services/auth';
import { userApi } from '../services/user';
import { productApi, warrantyClaimApi } from '../services/product';

import { userSlice } from './user';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [warrantyClaimApi.reducerPath]: warrantyClaimApi.reducer,
    [userSlice.name]: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      productApi.middleware,
      warrantyClaimApi.middleware,
    ),
});

setupListeners(store.dispatch);
