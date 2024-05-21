import {
  DemotionCreate,
  demotiontypeToAPI,
} from "@/app/component/staffingTransaction/demotion/DemotionType";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const demotionApi = createApi({
  reducerPath: "demotionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/staffingTransaction/demotion",
  }),
  endpoints: (builder) => ({
    createDemotion: builder.mutation({
      query: (demotion: DemotionCreate) => ({
        url: "/",
        method: "POST",
        body: demotiontypeToAPI(demotion),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useCreateDemotionMutation } = demotionApi;
