import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://advanced-ecommerce-app-api-raviranjan.vercel.app',
});

export const adminApiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: (builder) => ({
    seedDatabase: builder.mutation<any, void>({
      query: () => '/api/seed',
      invalidatesTags: ['Product', 'User', 'Order'],
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/api/users/auth',
        method: 'POST',
        body: data,
      }),
    }),
    getProducts: builder.query<any[], void>({
      query: () => '/api/products',
      providesTags: ['Product'],
    }),
  }),
});

export const { useLoginMutation, useGetProductsQuery, useSeedDatabaseMutation } = adminApiSlice;
