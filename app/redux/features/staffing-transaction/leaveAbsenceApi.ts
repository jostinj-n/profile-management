import { LeaveAbsenceCreate } from "@/app/component/staffingTransaction/leaveAbsence/LeaveAbsenceType";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const leaveAbsenceApi = createApi({
  reducerPath: "leaveAbsenceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/staffingTransaction/leaveAbsence",
  }),
  endpoints: (builder) => ({
    createLeaveAbsence: builder.mutation({
      query: (leaveAbsence: LeaveAbsenceCreate) => ({
        url: "/",
        method: "POST",
        body: leaveAbsence,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useCreateLeaveAbsenceMutation } = leaveAbsenceApi;
