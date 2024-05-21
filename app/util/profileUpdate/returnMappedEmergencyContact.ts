import { ContactDetails, EmergencyContact } from "@/app/types/employee";

export const mappedEmergencyContact = (rawResponse: ContactDetails) => {
  return rawResponse.emergencyContacts.map((contact: EmergencyContact) => {
    const mappedPhones = [
      {
        phoneNumber: contact.phoneNumber,
        personalDeviceTye: contact.contactType,
        primaryNumber: true,
        SmsAllowed: false,
      },
    ];

    return {
      primaryContact: contact.primaryFlag,
      relationship: contact.relationship,
      pronoun: contact.personalPronoun,
      firstName: contact.firstName,
      lastName: contact.lastName,
      preferredLanguage: contact.languageOfCommunication,
      proficiency: contact.languageProficiency,
      phones: mappedPhones,
      email: contact.emailAddress,
      notes: contact.notes,
    };
  });
};
