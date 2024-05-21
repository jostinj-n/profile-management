import {
  TransferCreate,
  transfertypeToAPI,
} from "@/app/component/staffingTransaction/transfer/TransferType";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const transferApi = createApi({
  reducerPath: "transferApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/staffingTransaction/demotion",
  }),
  endpoints: (builder) => ({
    createTransfer: builder.mutation({
      query: (transfer: TransferCreate) => ({
        url: "/",
        method: "POST",
        body: transfertypeToAPI(transfer),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useCreateTransferMutation } = transferApi;
