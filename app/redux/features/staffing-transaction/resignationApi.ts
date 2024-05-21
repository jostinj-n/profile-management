import { ResignationCreate } from "@/app/component/staffingTransaction/resignation/ResignationType";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const resignationApi = createApi({
  reducerPath: "resignationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/staffingTransaction/resignation",
  }),
  endpoints: (builder) => ({
    createResignation: builder.mutation({
      query: (resignation: ResignationCreate) => ({
        url: "/",
        method: "POST",
        body: resignation,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useCreateResignationMutation } = resignationApi;
