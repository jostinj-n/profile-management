import { ParkingChangeCreate } from "@/app/component/staffingTransaction/parkingChange/ParkingChangeType";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const parkingChangeApi = createApi({
  reducerPath: "parkingChangeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/staffingTransaction/parkingChange",
  }),
  endpoints: (builder) => ({
    createParkingChange: builder.mutation({
      query: (parkingChange: ParkingChangeCreate) => ({
        url: "/",
        method: "POST",
        body: parkingChange,
      }),
    }),
  }),
});

export const { useCreateParkingChangeMutation } = parkingChangeApi;
