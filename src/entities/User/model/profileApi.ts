import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from 'src/shared/api/baseQuery';
import { ChangePasswordBody, Profile, UpdateProfileBody } from '../types/user';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery,
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
