import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from 'src/shared/api/baseQuery';
import { convertToUrlSearchParams } from 'src/shared/lib/url/convertToUrlParams';
import { CreateBody, Product, ProductFilters, Result, UpdateBody } from '../types/product';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery,
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getAllProducts: builder.query<Result, void>({
      query: () => {
        const params = convertToUrlSearchParams({});
        return {
          url: '/products',
          method: 'GET',
          params,
        };
      },
      providesTags: ['Product'],
    }),
    getProducts: builder.query<Result, ProductFilters>({
      query: (filters: ProductFilters) => {
        const params = convertToUrlSearchParams(filters);
        return {
          url: '/products',
          method: 'GET',
          params,
        };
      },
      providesTags: ['Product'],
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
      providesTags: ['Product'],
    }),
    createProduct: builder.mutation<Product, CreateBody>({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation<Product, UpdateBody>({
      query: (body) => ({
        url: `/products/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation<Product, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
