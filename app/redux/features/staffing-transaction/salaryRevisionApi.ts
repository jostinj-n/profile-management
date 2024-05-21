import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NextResponse } from "next/server";
import {
  SalaryRevisionCreate,
  salaryRevisionTypeToCreateAPI,
} from "@/app/component/staffingTransaction/salaryRevision/SalaryRevisionType";

export const salaryRevisionApi = createApi({
  reducerPath: "salaryRevisionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/staffingTransaction/salaryRevision",
  }),
  endpoints: (build) => ({
    createSalaryRevision: build.mutation<NextResponse, SalaryRevisionCreate>({
      query: (salaryRevisionCreate) => ({
        url: "/",
        method: "POST",
        body: { ...salaryRevisionTypeToCreateAPI(salaryRevisionCreate) },
      }),
    }),
  }),
});

export const { useCreateSalaryRevisionMutation } = salaryRevisionApi;
