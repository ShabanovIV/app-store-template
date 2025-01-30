import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from 'src/shared/config/apiConfig';
import { selectToken } from './authSlice';
import { ChangePasswordBody, Profile, UpdateProfileBody } from '../types/user';

export const profileApi = createApi({
  reducerPath: 'profileApi',

  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = selectToken(getState() as RootState);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    profile: builder.query<Profile, void>({
      query: () => ({
        url: '/profile',
        method: 'GET',
      }),
    }),
    updateProfile: builder.mutation<Profile, UpdateProfileBody>({
      query: (body) => ({
        url: '/profile',
        method: 'PATCH',
        body,
      }),
    }),
    changePassword: builder.mutation<{ success: boolean }, ChangePasswordBody>({
      query: (body) => ({
        url: '/profile/change-password',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useProfileQuery, useUpdateProfileMutation, useChangePasswordMutation } = profileApi;
