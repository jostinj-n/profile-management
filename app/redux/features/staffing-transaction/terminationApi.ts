import { TerminationCreate } from "@/app/component/staffingTransaction/termination/TerminationType";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const terminationApi = createApi({
  reducerPath: "terminationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/staffingTransaction/termination",
  }),
  endpoints: (builder) => ({
    createTermination: builder.mutation({
      query: (termination: TerminationCreate) => ({
        url: "/",
        method: "POST",
        body: termination,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useCreateTerminationMutation } = terminationApi;
