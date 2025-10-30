import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersAPI = createApi({
  reducerPath: "usersAPI",
  tagTypes: ["user"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: "include",
    paramsSerializer: (params) => {
      const result = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          // Ne serialize que les tableaux non vides
          if (value.length > 0) {
            value.forEach((val) => val && result.append(key, val));
          }
        } else if (value !== undefined && value !== "") {
          result.append(key, value as string);
        }
      });
      return result.toString();
    },
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (params) => {
        return {
          url: `users`,
          method: "GET",
          params,
        };
      },
      providesTags: ["user"],
    }),
    getAllUser: builder.query({
      query: (params) => {
        return {
          url: `users`,
          method: "GET",
          params,
        };
      },
      providesTags: ["user"],
    }),

    getAllUserForTasks: builder.query({
      query: (params) => {
        return {
          url: `users/tasks`,
          method: "GET",
          params,
        };
      },
      providesTags: ["user"],
    }),
    getAllUserCandidate: builder.query({
      query: (params) => {
        return {
          url: `user/candidate`,
          method: "GET",
          params,
        };
      },
      providesTags: ["user"],
    }),
    getUserById: builder.query({
      query: (id) => {
        return {
          url: `users/${id}`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
    updateUserCandidate: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/user/update/candidate/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["user"],
    }),

    updateUser: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/users/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["user"],
    }),

    addUser: builder.mutation({
      query: (obj) => {
        return {
          url: `users`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["user"],
    }),

    deleteUserCandidate: builder.mutation({
      query: (id) => {
        return {
          url: `/user/candidate/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `/users/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useGetAllUserQuery,
  useGetAllUserCandidateQuery,
  useUpdateUserCandidateMutation,
  useDeleteUserCandidateMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetAllUserForTasksQuery,
} = usersAPI;
