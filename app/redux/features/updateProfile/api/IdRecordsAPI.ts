import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EmployeePersonalDetailsProfileUpdate } from "@/app/types/employee";
import { GovernmentSectionType } from "@/app/[lang]/workforce/profile-update/governmentIDs/zodSchema/governmentSchema";
import { returnGroupedIdRecords } from "@/app/util/profileUpdate/returnGroupedIdRecords";

export const idRecordsAPI = createApi({
  reducerPath: "idRecordsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/personalDetails" }),
  endpoints: (builder) => ({
    idRecordsProfileUpdate: builder.query<GovernmentSectionType, string>({
      query: (employeeID: string) => `/${employeeID}/profileUpdate`,
      transformResponse: (
        rawResponse: EmployeePersonalDetailsProfileUpdate,
      ) => {
        const { citizenStatusIDs, taxIDs, governmentIDs } =
          returnGroupedIdRecords(rawResponse);
        return {
          citizenStatusIDs,
          governmentIDs,
          taxIDs,
          personId: rawResponse.personal_detail.person_id,
          binaryGender: rawResponse.personal_detail.gender_binary,
          citizenStatusCountry: rawResponse.personal_detail.citizen_country,
          citizenStatus: rawResponse.personal_detail.citizen_status,
          personalDetailsNotes: rawResponse.personal_detail.notes,
        };
      },
    }),
  }),
});

export const { useLazyIdRecordsProfileUpdateQuery } = idRecordsAPI;
