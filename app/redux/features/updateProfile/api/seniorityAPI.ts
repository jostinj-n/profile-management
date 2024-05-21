import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SeniorityDetailsAPIResponse } from "@/app/types/employee";
import { SenioritySchemaType } from "@/app/[lang]/workforce/profile-update/seniority/zodSchema/senioritySchema";
import dayjs from "dayjs";

export const seniorityAPI = createApi({
  reducerPath: "seniorityAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/seniority" }),
  endpoints: (builder) => ({
    getSeniorityProfileUpdate: builder.query<SenioritySchemaType, string>({
      query: (employeeID: string) => `/${employeeID}/profileUpdate`,
      transformResponse: (rawResponse: SeniorityDetailsAPIResponse) => {
        return {
          seniority: rawResponse.seniority_detail.map((data) => ({
            //TODO ADD SENIORITY ID IN BACKEND
            seniorityId: data.person_id,
            personId: data.person_id,
            seniorityDate: dayjs(data.seniority_date),
            seniorityDateTypeTiebreaker: data.seniority_tie_breaker,
            suppressSeniorityFlag: data.seniority_suppress_flag,
            notes: data.notes,
          })),
        };
      },
    }),
  }),
});

export const { useLazyGetSeniorityProfileUpdateQuery } = seniorityAPI;
