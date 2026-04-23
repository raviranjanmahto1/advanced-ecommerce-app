import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://advanced-ecommerce-app-api-raviranjan.vercel.app',
  credentials: 'include',
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: (builder) => ({
    getProducts: builder.query<any[], void>({
      query: () => '/api/products',
      providesTags: ['Product'],
    }),
    getProductDetails: builder.query<any, string>({
      query: (id) => `/api/products/${id}`,
      providesTags: ['Product'],
    }),
    createReview: builder.mutation<any, { productId: string; rating: number; comment: string }>({
      query: (data) => ({
        url: `/api/products/${data.productId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    getCart: builder.query<any, void>({
      query: () => '/api/cart',
    }),
    syncCart: builder.mutation<any, any>({
      query: (cartItems) => ({
        url: '/api/cart',
        method: 'POST',
        body: { cartItems }
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/api/users/auth',
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: '/api/users',
        method: 'POST',
        body: data,
      }),
    }),
    getProfile: builder.query<any, void>({
      query: () => '/api/users/profile',
    }),
    updateProfile: builder.mutation<any, any>({
      query: (data) => ({
        url: '/api/users/profile',
        method: 'PUT',
        body: data,
      }),
    }),
    createOrder: builder.mutation<any, any>({
      query: (order) => ({
        url: '/api/orders',
        method: 'POST',
        body: order,
      }),
    }),
    getMyOrders: builder.query<any[], void>({
      query: () => '/api/orders/myorders',
    }),
  }),
});

export const { 
  useGetProductsQuery, 
  useGetProductDetailsQuery, 
  useCreateReviewMutation,
  useGetCartQuery,
  useLazyGetCartQuery,
  useSyncCartMutation,
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useCreateOrderMutation,
  useGetMyOrdersQuery
} = apiSlice;
