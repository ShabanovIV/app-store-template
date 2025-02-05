import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from 'src/shared/api/baseQuery';
import { convertToUrlSearchParams } from 'src/shared/lib/url/convertToUrlParams';
import { CreateBody, Product, ProductFilters, Result, UpdateBody } from '../types/product';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery,
  endpoints: (builder) => ({
    getProducts: builder.query<Result, ProductFilters>({
      query: (filters: ProductFilters) => {
        const params = convertToUrlSearchParams(filters);
        return {
          url: '/products',
          method: 'GET',
          params,
        };
      },
    }),
    createProduct: builder.mutation<Product, CreateBody>({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body,
      }),
    }),
    updateProduct: builder.mutation<Product, UpdateBody>({
      query: (body) => ({
        url: `/products/${body.id}`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteProduct: builder.mutation<Product, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
