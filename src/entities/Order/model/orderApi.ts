import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from 'src/shared/api/baseQuery';
import { convertToUrlSearchParams } from 'src/shared/lib/url/convertToUrlParams';
import { CreateBody, Order, OrderFilters, Result, UpdateBody } from '../types/order';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery,
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
