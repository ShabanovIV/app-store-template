import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthResult } from '../types/user';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://19429ba06ff2.vps.myjino.ru/api' }),
  endpoints: (builder) => ({
    signup: builder.mutation<AuthResult, { email: string; password: string }>({
      query: (body) => ({
        url: '/signup',
        method: 'POST',
        body,
      }),
    }),
    signin: builder.mutation<AuthResult, { email: string; password: string }>({
      query: (body) => ({
        url: '/signin',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSignupMutation, useSigninMutation } = userApi;
