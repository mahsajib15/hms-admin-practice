import { authApi } from '@/app/api/authApi';
import { logout, setCredentials } from './authSlice';
import { fetchApiData } from '@/app/api/loader';

export const authApiSlice = authApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    session: builder.query({
      query: () => '/auth/session',
      providesTags: ['session'],

      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          const session = result.data.session;
          dispatch(
            setCredentials({
              user: session,
              token: getState().auth.token,
            })
          );
          //
        } catch (err) {
          dispatch(logout());
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'DELETE',
      }),
    }),
  }),
});

export async function preFetchSession(arg) {
  await fetchApiData(authApiSlice, 'session', arg);
  return [];
}

export const { useLoginMutation, useSessionQuery, useLogoutMutation } =
  authApiSlice;
