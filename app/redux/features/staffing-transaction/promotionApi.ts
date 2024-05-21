import {
  PromotionCreate,
  promotiontypeToAPI,
} from "@/app/component/staffingTransaction/promotion/PromotionType";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const promotionApi = createApi({
  reducerPath: "promotionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/staffingTransaction/promotion",
  }),
  endpoints: (builder) => ({
    createPromotion: builder.mutation({
      query: (promotion: PromotionCreate) => ({
        url: "/",
        method: "POST",
        body: promotiontypeToAPI(promotion),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useCreatePromotionMutation } = promotionApi;
