import { configureStore } from '@reduxjs/toolkit';

import { authApi } from './api/authApi';
import { cartApi } from './api/cartApi';
import { productsApi } from './api/productsApi';
import { authReducer } from './authSlice';

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      cartApi.middleware,
      authApi.middleware
    ),
});
