import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Bank } from "@/app/types/bank";
import { PersonProfileType } from "@/app/[lang]/workforce/profile-update/personProfile/zodSchema/personProfileSchema";
import { ContactDetailsType } from "@/app/[lang]/workforce/profile-update/contactDetails/zodSchema/contactDetailsSchema";
import { mappedContactDetails } from "@/app/redux/features/updateProfile/api/util/mappedFunctions/mappedContactDetails";
import { mappedPersonProfile } from "@/app/api/updateProfile/personProfile/mappedPersonProfile";
import { mappedBank } from "@/app/api/updateProfile/mappedBank";
import { GovernmentSectionType } from "@/app/[lang]/workforce/profile-update/governmentIDs/zodSchema/governmentSchema";
import { mappedIdRecords } from "@/app/redux/features/updateProfile/api/util/mappedFunctions/mappedIdRecords";
import { SenioritySchemaType } from "@/app/[lang]/workforce/profile-update/seniority/zodSchema/senioritySchema";
import { mappedSeniority } from "@/app/redux/features/updateProfile/api/util/mappedFunctions/mappedSeniority";

export const updateProfileAPI = createApi({
  reducerPath: "updateProfileAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/updateProfile" }),
  endpoints: (builder) => ({
    putBankingInformation: builder.mutation({
      query: (bank: Bank) => ({
        url: "/banks",
        method: "PUT",
        body: mappedBank(bank),
      }),
    }),
    putPersonProfile: builder.mutation({
      query: (personProfile: PersonProfileType) => ({
        url: "/personProfile",
        method: "PUT",
        body: mappedPersonProfile(personProfile),
      }),
    }),
    putContactDetails: builder.mutation({
      query: (contactDetails: ContactDetailsType) => ({
        url: "/contactDetails",
        method: "PUT",
        body: mappedContactDetails(contactDetails),
      }),
    }),
    putIdRecords: builder.mutation({
      query: (idRecords: GovernmentSectionType) => ({
        url: "/idRecords",
        method: "PUT",
        body: mappedIdRecords(idRecords),
      }),
    }),
    putSeniority: builder.mutation({
      query: (seniorityDetails: SenioritySchemaType) => ({
        url: "/seniority",
        method: "PUT",
        body: mappedSeniority(seniorityDetails),
      }),
    }),
  }),
});

export const {
  usePutBankingInformationMutation,
  usePutPersonProfileMutation,
  usePutContactDetailsMutation,
  usePutIdRecordsMutation,
  usePutSeniorityMutation,
} = updateProfileAPI;
