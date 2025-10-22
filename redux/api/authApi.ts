import { logout } from "@/redux/features/authSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { persistor } from "@/redux/store";
export const authAPI = createApi({
  reducerPath: "authAPI",
  tagTypes: ["authentication"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => {
        return {
          url: "/auth/me",
          method: "GET",
        };
      },
      providesTags: ["authentication"],
    }),
    login: builder.mutation({
      query: (credentials) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: credentials,
        };
      },
      invalidatesTags: ["authentication"],
    }),
    forgotPassword: builder.mutation({
      query: (credentials) => {
        return {
          url: "/auth/forgot-password",
          method: "POST",
          body: credentials,
        };
      },
      invalidatesTags: ["authentication"],
    }),
    resetPassword: builder.mutation({
      query: ({ newPassword, resetToken }) => {
        return {
          url: `/auth/reset-password/${resetToken}`,
          method: "POST",
          body: { newPassword },
        };
      },
      invalidatesTags: ["authentication"],
    }),
    refreshToken: builder.query({
      query: () => {
        return {
          url: "/auth/refresh-token",
          method: "GET",
        };
      },
      providesTags: ["authentication"],
    }),
    logout: builder.mutation({
      query: () => {
        return {
          url: "/auth/logout",
          method: "POST",
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(logout()); // Redux reset
          dispatch(authAPI.util.resetApiState()); // RTK Query reset
          await persistor.purge(); // 🧹 Purge redux-persist (localStorage)
        } catch (error) {
          console.error("Erreur lors de la déconnexion :", error);
        }
      },
      invalidatesTags: ["authentication"],
    }),
  }),
});
export const {
  useLoginMutation,
  useGetUserQuery,
  useLogoutMutation,
  useRefreshTokenQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authAPI;
