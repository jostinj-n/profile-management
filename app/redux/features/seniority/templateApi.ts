import { GroupingCreate } from "@/app/[lang]/workforce/seniority/create-grouping/types/groupingType";

import { GroupingApiRequest, GroupingRow } from "@/app/types/templates";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const groupingApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/seniority/template" }), // Change this to your API endpoint
  tagTypes: ["Grouping"],
  endpoints: (builder) => ({
    getGroupings: builder.query({
      query: (params: GroupingApiRequest) => ({
        url: "/",
        params, // Pass the parameters here
      }),
    }),
    selectGrouping: builder.query<GroupingRow, any>({
      query: (id) => `/${id}`,
      providesTags: ["Grouping"],
    }),
    createGrouping: builder.mutation({
      query: (grouping: GroupingCreate) => ({
        url: "/",
        method: "POST",
        body: grouping,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Grouping"],
    }),
    updateGrouping: builder.mutation({
      query: ({ id, grouping }) => ({
        url: `/${id}`,
        method: "PUT",
        body: grouping,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Grouping"],
    }),
    deleteGrouping: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetGroupingsQuery,
  useSelectGroupingQuery,
  useCreateGroupingMutation,
  useUpdateGroupingMutation,
  useDeleteGroupingMutation,
} = groupingApi;
