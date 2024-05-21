import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ContactDetailsType } from "@/app/[lang]/workforce/profile-update/contactDetails/zodSchema/contactDetailsSchema";
import { ContactDetails } from "@/app/types/employee";
import { returnPhonesArray } from "@/app/util/profileUpdate/returnPhonesArray";
import { returnEmailsArray } from "@/app/util/profileUpdate/returnEmailslArray";
import { mappedEmergencyContact } from "@/app/util/profileUpdate/returnMappedEmergencyContact";

export const contactDetailsAPI = createApi({
  reducerPath: "contactDetailsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/contacts" }),
  endpoints: (builder) => ({
    contactDetailsProfileUpdate: builder.query<ContactDetailsType, string>({
      query: (employeeID: string) => `/${employeeID}`,
      transformResponse: (rawResponse: ContactDetails) => {
        return {
          personId: rawResponse.contactDetails.personId,
          phones: returnPhonesArray(rawResponse),
          emails: returnEmailsArray(rawResponse),
          residentialAddress: rawResponse.address.residentialAddress,
          mailingAddress: rawResponse.address.mailingAddress,
          sameMailingAddress:
            rawResponse.address.isMailingAddressSameAsResidential,
          emergencyContacts: mappedEmergencyContact(rawResponse),
        };
      },
    }),
  }),
});

export const { useLazyContactDetailsProfileUpdateQuery } = contactDetailsAPI;
