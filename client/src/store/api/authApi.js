import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'auth/api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/auth' }),
  endpoints: builder => ({
    signup: builder.mutation({
      query: formData => ({
        url: '/register',
        method: 'POST',
        body: formData,
      }),
    }),
    login: builder.mutation({
      query: formData => ({
        url: '/login',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
