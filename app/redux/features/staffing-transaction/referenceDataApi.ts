import { DropdownOption } from "@/app/types/referenceData";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const referenceDataApi = createApi({
  reducerPath: "referenceDataApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/staffingTransaction/referenceData",
  }),
  endpoints: (builder) => ({
    getData: builder.query<DropdownOption[], string>({
      query: (name: string) => `/${name}`,
    }),
  }),
});

export const { useGetDataQuery } = referenceDataApi;
