import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from '../features/auth/authSlice';
import { API_URL } from '@/index';

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: import.meta.env.DEV ? undefined : 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
  timeout: 30000,
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    result = await baseQuery('/auth/refresh', api, extraOptions);
    if (result?.data) {
      const user = api.getState().auth.user;
      // store the new token
      // console.log(result.data.access_token);
      api.dispatch(
        setCredentials({
          token: result.data.access_token,
          user: user,
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({}),
});
