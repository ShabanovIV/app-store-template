import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from 'src/shared/api/baseQuery';
import { convertToUrlSearchParams } from 'src/shared/lib/url/convertToUrlParams';
import { Category, Result, CreateBody, CategoryFilters, UpdateBody } from '../types/category';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery,
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    getAllCategories: builder.query<Result, void>({
      query: () => {
        const params = convertToUrlSearchParams({});
        return {
          url: '/categories',
          method: 'GET',
          params,
        };
      },
      providesTags: ['Category'],
    }),
    getCategories: builder.query<Result, CategoryFilters>({
      query: (filters: CategoryFilters) => {
        const params = convertToUrlSearchParams(filters);
        return {
          url: '/categories',
          method: 'GET',
          params,
        };
      },
      providesTags: ['Category'],
    }),
    getCategoryById: builder.query<Category, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'GET',
      }),
      providesTags: ['Category'],
    }),
    createCategory: builder.mutation<Category, CreateBody>({
      query: (body) => ({
        url: '/categories',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Category'],
    }),
    updateCategory: builder.mutation<Category, UpdateBody>({
      query: ({ id, name, photo }) => ({
        url: `/categories/${id}`,
        method: 'PATCH',
        body: { name, photo },
      }),
      invalidatesTags: ['Category'],
    }),
    deleteCategory: builder.mutation<Category, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
