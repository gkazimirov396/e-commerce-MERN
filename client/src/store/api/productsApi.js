import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'products/api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: builder => ({
    fetchProducts: builder.query({
      query: category => ({
        url: '/products',
        params: {
          category,
        },
      }),
    }),
    fetchSingleProduct: builder.query({
      query: id => `/products/${id}`,
    }),
  }),
});

export const { useFetchProductsQuery, useFetchSingleProductQuery } = productsApi;
