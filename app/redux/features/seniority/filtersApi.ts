import { FilterResponse } from "@/app/api/seniority/filters/[name]/route";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const filtersApi = createApi({
  reducerPath: "filtersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/seniority/filters/" }), // Change this to your API endpoint
  endpoints: (builder) => ({
    getFilter: builder.query<FilterResponse[], string>({
      query: (name: string) => `${name}`,
    }),
  }),
});

export const { useGetFilterQuery } = filtersApi;
