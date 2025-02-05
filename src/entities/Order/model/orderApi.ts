import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { convertToUrlSearchParams } from 'src/shared/lib/url/convertToUrlParams';
import { CreateBody, Order, OrderFilters, Result, UpdateBody } from '../types/order';

const BASE_URL = 'http://19429ba06ff2.vps.myjino.ru/api';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getOrders: builder.query<Result, OrderFilters>({
      query: (filters: OrderFilters) => {
        const params = convertToUrlSearchParams(filters);
        return {
          url: '/orders',
          method: 'GET',
          params,
        };
      },
    }),
    createOrder: builder.mutation<Order, CreateBody>({
      query: (body) => ({
        url: '/orders',
        method: 'POST',
        body,
      }),
    }),
    updateOrder: builder.mutation<Order, UpdateBody>({
      query: ({ id, productIds, status }) => ({
        url: `/orders/${id}`,
        method: 'PATCH',
        body: { productIds, status },
      }),
    }),
    deleteOrder: builder.mutation<Order, string>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
