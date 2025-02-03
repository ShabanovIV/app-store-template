import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from 'src/shared/config/apiConfig';

export const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
