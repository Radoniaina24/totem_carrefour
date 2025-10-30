import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const candidateAPI = createApi({
  reducerPath: "candidateAPI",
  tagTypes: ["candidate"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: "include",
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getAllCandidate: builder.query({
      query: (params) => {
        return {
          url: `cv`,
          method: "GET",
          params,
        };
      },
      providesTags: ["candidate"],
    }),
    getMyCv: builder.query({
      query: () => {
        return {
          url: `cv/myCv`,
          method: "GET",
        };
      },
      providesTags: ["candidate"],
    }),

    addCandidate: builder.mutation({
      query: (values) => {
        return {
          url: `cv`,
          method: "POST",
          body: values,
        };
      },
      invalidatesTags: ["candidate"],
    }),
    updateMyCv: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `cv/updateMyCv/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["candidate"],
    }),
  }),
});

export const {
  useAddCandidateMutation,
  useGetAllCandidateQuery,
  useGetMyCvQuery,
  useUpdateMyCvMutation,
} = candidateAPI;
