import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type EmploymentDetailsApiResponse = {
  employment_detail_id: number;
  company: string;
  division: string;
  work_location_code: string;
  work_location_name: string;
  employment_status: string;
  employment_classification: string;
  department: string;
  catsa_job_level: string;
  vacation_entitlement_date: string;
  is_position_unionized: true;
  organisational_role: string;
  organisational_role_subtype: string;
  job_title: string;
};

export type PreviousEmploymentDetail = {
  department: string;
  vacationEntitlementDate: string;
  jobLevel: string;
  employmentStatus: string;
  employmentClassification: string;

  company: string;
  division: string;
  workLocationCode: string;
  workLocationName: string;
  catsaJobLevel: string;
  isPositionUnionized: boolean;
  organisationalRole: string;
  organisationalRoleSubtype: string;
  jobTitle: string;
};

export const employmentDetailsApi = createApi({
  reducerPath: "employmentDetailsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/staffingTransaction/employmentDetails",
  }),
  endpoints: (builder) => ({
    getEmploymentDetails: builder.query<PreviousEmploymentDetail, number>({
      query: (id: number) => `/${id}`,
    }),
  }),
});

export const { useGetEmploymentDetailsQuery } = employmentDetailsApi;
