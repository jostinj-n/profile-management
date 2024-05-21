import { ContactDetails } from "@/app/types/employee";

export const returnEmailsArray = (rawResponse: ContactDetails) => {
  const emails = [
    {
      personalEmailAddress: rawResponse.contactDetails.primaryEmailAddress,
      primaryEmailAddress: true,
      emailGeneralCorrespondence:
        rawResponse.contactDetails.isEmailAllowedPrimary,
    },
  ];
  if (rawResponse.contactDetails.secondaryEmailAddress) {
    emails.push({
      personalEmailAddress: rawResponse.contactDetails.secondaryEmailAddress,
      primaryEmailAddress: false,
      emailGeneralCorrespondence:
        rawResponse.contactDetails.isEmailAllowedSecondary,
    });
  }
  return emails;
};
