import { EmployeeCompensation } from "@/app/types/employee";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeeCompensationApi = createApi({
  reducerPath: "employeeCompensationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/compensation",
  }),
  endpoints: (builder) => ({
    getEmployeeCompensation: builder.query<EmployeeCompensation[], string>({
      query: (employeeId: string) => `${employeeId}`,
    }),
  }),
});

export const { useGetEmployeeCompensationQuery } = employeeCompensationApi;
