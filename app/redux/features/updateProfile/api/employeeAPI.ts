import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PersonProfileType } from "@/app/[lang]/workforce/profile-update/personProfile/zodSchema/personProfileSchema";

export const employeeAPI = createApi({
  reducerPath: "employeeAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/employees" }),
  endpoints: (builder) => ({
    getEmployeeForProfileUpdate: builder.query<PersonProfileType, string>({
      query: (employeeID: string) => `/${employeeID}/profileUpdate`,
    }),
  }),
});

export const { useLazyGetEmployeeForProfileUpdateQuery } = employeeAPI;
