import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL, API_COMMAND_ID } from 'src/shared/config/apiConfig';
import { AuthResult, SignUpBody, SignInBody } from '../types/user';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    signup: builder.mutation<AuthResult, SignUpBody>({
      query: (body) => ({
        url: '/signup',
        method: 'POST',
        body: { ...body, commandId: API_COMMAND_ID },
      }),
    }),
    signin: builder.mutation<AuthResult, SignInBody>({
      query: (body) => ({
        url: '/signin',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSignupMutation, useSigninMutation } = userApi;
