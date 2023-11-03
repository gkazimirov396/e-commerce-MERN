import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
  reducerPath: 'cart/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Cart'],
  endpoints: builder => ({
    fetchCart: builder.query({
      query: () => '/cart',
      providesTags: ['Cart'],
    }),
    addToCart: builder.mutation({
      query: ({ id, ...newCartItem }) => ({
        url: `/cart/${id}`,
        method: 'PUT',
        body: newCartItem,
      }),
      invalidatesTags: ['Cart'],
    }),
    removeFromCart: builder.mutation({
      query: id => ({
        url: `/cart/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
    checkoutCart: builder.mutation({
      query: formData => ({
        url: '/cart/checkout',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useFetchCartQuery,
  useAddToCartMutation,
  useCheckoutCartMutation,
  useRemoveFromCartMutation,
} = cartApi;
