import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NextResponse } from "next/server";
import { ClassificationChangeFrontPayload } from "@/app/component/staffingTransaction/classificationChange/ClassificationChangeType";

export const classificationChangeApi = createApi({
  reducerPath: "classificationChangeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/staffingTransaction/classificationChange",
  }),
  endpoints: (build) => ({
    postClassificationChange: build.mutation<
      NextResponse,
      ClassificationChangeFrontPayload
    >({
      query: (classificationChange) => ({
        url: "/",
        method: "POST",
        body: {
          person_id: classificationChange.personId,
          employment_detail_id: classificationChange.employmentDetailId,
          effective_date: classificationChange.effectiveDate,
          new_department: classificationChange.newDepartment,
          new_vacation_entitlement_date:
            classificationChange.newVacationEntitlementDate,
          new_catsa_job_level: classificationChange.newCatsaJobLevel,
          new_employment_classification:
            classificationChange.newEmploymentClassification,
          new_employment_status: classificationChange.newEmploymentStatus,
          explanation: classificationChange.explanation,
        },
      }),
    }),
  }),
});

export const { usePostClassificationChangeMutation } = classificationChangeApi;
