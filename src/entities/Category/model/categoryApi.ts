import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from 'src/shared/api/baseQuery';
import { convertToUrlSearchParams } from 'src/shared/lib/url/convertToUrlParams';
import { Category, Result, CreateBody, CategoryFilters, UpdateBody } from '../types/category';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery,
  endpoints: (builder) => ({
    getCategories: builder.query<Result, CategoryFilters>({
      query: (filters: CategoryFilters) => {
        const params = convertToUrlSearchParams(filters);
        return {
          url: '/categories',
          method: 'GET',
          params,
        };
      },
    }),
    createCategory: builder.mutation<Category, CreateBody>({
      query: (body) => ({
        url: '/categories',
        method: 'POST',
        body,
      }),
    }),
    updateCategory: builder.mutation<Category, UpdateBody>({
      query: ({ id, name, photo }) => ({
        url: `/categories/${id}`,
        method: 'PATCH',
        body: { name, photo },
      }),
    }),
  }),
});

export const { useGetCategoriesQuery, useCreateCategoryMutation, useUpdateCategoryMutation } =
  categoryApi;
