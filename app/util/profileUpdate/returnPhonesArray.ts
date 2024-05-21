import { ContactDetails } from "@/app/types/employee";

export const returnPhonesArray = (rawResponse: ContactDetails) => {
  const phones = [
    {
      phoneNumber: rawResponse.contactDetails.primaryPhoneNumber,
      personalDeviceTye: rawResponse.contactDetails.personalDeviceType,
      primaryNumber: true,
      SmsAllowed: rawResponse.contactDetails.isSmsAllowedPrimary,
    },
  ];
  if (rawResponse.contactDetails.secondaryPhoneNumber) {
    phones.push({
      phoneNumber: rawResponse.contactDetails.secondaryPhoneNumber,
      personalDeviceTye: rawResponse.contactDetails.secondaryDeviceType,
      primaryNumber: false,
      SmsAllowed: rawResponse.contactDetails.secondaryPhoneHasSms,
    });
  }
  return phones;
};
