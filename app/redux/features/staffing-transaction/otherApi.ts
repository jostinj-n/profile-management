import { OtherCreate } from "@/app/component/staffingTransaction/other/OtherType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const otherApi = createApi({
  reducerPath: "otherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/staffingTransaction/other",
  }),
  endpoints: (builder) => ({
    createOther: builder.mutation({
      query: (other: OtherCreate) => ({
        url: "/",
        method: "POST",
        body: other,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useCreateOtherMutation } = otherApi;
