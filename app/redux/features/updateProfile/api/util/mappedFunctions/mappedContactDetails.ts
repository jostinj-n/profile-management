import { ContactDetailsType } from "@/app/[lang]/workforce/profile-update/contactDetails/zodSchema/contactDetailsSchema";

export const mappedContactDetails = (contact: ContactDetailsType) => ({
  Contact: {
    person_id: contact.personId,
    //TODO ADD REAL CONTACT_ID
    contact_id: 1,
    primary_device_type: contact.phones[0].primaryNumber
      ? contact.phones[0].personalDeviceTye
      : contact.phones[1]?.personalDeviceTye,
    primary_phone_number: contact.phones[0].primaryNumber
      ? contact.phones[0].phoneNumber
      : contact.phones[1]?.phoneNumber,
    primary_phone_has_sms: contact.phones[0].primaryNumber
      ? contact.phones[0].SmsAllowed
      : contact.phones[1]?.SmsAllowed,
    is_sms_allowed_primary: contact.phones[0].primaryNumber
      ? contact.phones[0].SmsAllowed
      : contact.phones[1]?.SmsAllowed,
    primary_email_address: contact.emails[0].primaryEmailAddress
      ? contact.emails[0].personalEmailAddress
      : contact.emails[1]?.personalEmailAddress,
    is_email_allowed_primary: contact.emails[0].primaryEmailAddress
      ? contact.emails[0].emailGeneralCorrespondence
      : contact.emails[1]?.emailGeneralCorrespondence,
    //TODO SECONDARY DEVICE TYPE IS REQUIRED IN THE BACKEND AND IF NOT A VALID REFERENCE DATA, ERROR**
    secondary_device_type: contact.phones[0].primaryNumber
      ? contact.phones[1]?.personalDeviceTye || "Mobile"
      : contact.phones[0]?.personalDeviceTye,
    secondary_phone_number: contact.phones[0].primaryNumber
      ? contact.phones[1]?.phoneNumber || ""
      : contact.phones[0]?.phoneNumber,
    secondary_phone_has_sms: contact.phones[0].primaryNumber
      ? contact.phones[1]?.SmsAllowed || false
      : contact.phones[0]?.SmsAllowed,
    is_sms_allowed_secondary: contact.phones[0].primaryNumber
      ? contact.phones[1]?.SmsAllowed
      : contact.phones[0]?.SmsAllowed,
    secondary_email_address: contact.emails[0].primaryEmailAddress
      ? contact.emails[1]?.personalEmailAddress
      : contact.emails[0]?.personalEmailAddress,
    is_email_allowed_secondary: contact.emails[0].primaryEmailAddress
      ? contact.emails[1]?.emailGeneralCorrespondence
      : contact.emails[0]?.emailGeneralCorrespondence,
  },

  Address: {
    //TODO IN THE EXCEL FILE, THERE ONLY RES ADDRESS,MAILING ADDRESS FLAG AND MAILING ADDRESS
    person_id: contact.personId,
    //TODO ADD REAL ADDRESS_ID
    address_id: 1,
    residential_address: contact.residentialAddress,
    residential_additional_notes: "string",
    residential_city: "string",
    residential_province_state: "string",
    residential_country: "Canada",
    residential_postal_code: "string",
    is_mailing_address_same_as_residential: contact.sameMailingAddress,
    mailing_address: "string",
    mailing_additional_notes: "string",
    mailing_city: "string",
    mailing_province_state: "string",
    mailing_country: "Canada",
    mailing_postal_code: "string",
  },

  //TODO MISSING THE PRIMARY PHONE NUMBER FLAG IN THE BACK
  emergency_contact: contact.emergencyContacts.map((emergency) => ({
    person_id: contact.personId,
    //TODO ADD REAL EMERGENCY_CONTACT_ID
    emergency_contact_id: 1,
    primary_flag: emergency.primaryContact,
    personal_pronoun: emergency.pronoun,
    first_name: emergency.firstName,
    last_name: emergency.lastName,
    relationship: emergency.relationship,
    language_of_communication: emergency.preferredLanguage,
    language_proficiency: emergency.proficiency,
    contact_type: "Landline", //NOT IN THE EXCEL
    phone_number: emergency.phones[0].phoneNumber,
    //TODO IN THE EXCEL ONLY 1 EMAIL MAX PER EMERGENCY
    email_address: emergency.email,
    secondary_contact_type: "Landline", //NOT IN EXCEL
    secondary_phone_number: emergency.phones[1]?.phoneNumber || "",
    secondary_email_address: "user@example.com",
    notes: emergency.notes,
  })),
});
