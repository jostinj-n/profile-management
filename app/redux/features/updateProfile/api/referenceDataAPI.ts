import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ReferenceDataAPIResponse } from "@/app/types/referenceData";
import { Option } from "@/app/[lang]/workforce/profile-update/types/referenceData";

//FOR YOHANN : I don't know if this is the right way to do it.
export const refDataProfileUpdateAPI = createApi({
  reducerPath: "referenceDataAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/referenceData" }),
  endpoints: (builder) => ({
    referenceDataAPI: builder.query<Option[], void>({
      query: () => ``,
      transformResponse: (rawResponse: ReferenceDataAPIResponse) => {
        return rawResponse.map((refData) => ({
          name: refData.name,
          id: refData.id,
          table_name: refData.table_name,
          code: refData.code,
        }));
      },
    }),
  }),
});

export const { useLazyReferenceDataAPIQuery, useReferenceDataAPIQuery } =
  refDataProfileUpdateAPI;
