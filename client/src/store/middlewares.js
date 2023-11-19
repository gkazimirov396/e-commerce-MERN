import { authApi } from './api/authApi';
import { cartApi } from './api/cartApi';
import { productsApi } from './api/productsApi';

export const rootMiddleware = getDefaultMiddleware =>
  getDefaultMiddleware().concat(
    productsApi.middleware,
    cartApi.middleware,
    authApi.middleware
  );
