import { GovernmentSectionType } from "@/app/[lang]/workforce/profile-update/governmentIDs/zodSchema/governmentSchema";

export const mappedIdRecords = (idRecords: GovernmentSectionType) => {
  const returnIDsArray = () => {
    const citizenStatusIDs = idRecords.citizenStatusIDs.map((id) => ({
      person_id: idRecords.personId,
      id_record_id: 1,
      id_type: id.citizenStatusIdType,
      issuing_agency: id.issuingAgency,
      id_number: id.citizenStatusIdNumber,
      effective_from: id.citizenStatusEffectiveFrom.format("YYYY-MM-DD"),
      effective_to: id.citizenStatusEffectiveTo.format("YYYY-MM-DD"),
    }));
    const governmentIDs = idRecords.governmentIDs.map((id) => ({
      person_id: idRecords.personId,
      //TODO ADD REAL ID RECORD
      id_record_id: 1,
      id_type: id.typeOfId,
      issuing_agency: id.issuedByAgency,
      id_number: id.issuedValue,
      effective_from: null,
      effective_to: id.expiryDate.format("YYYY-MM-DD"),
    }));
    const taxIDs = idRecords.taxIDs.map((id) => ({
      person_id: idRecords.personId,
      id_record_id: 1,
      id_type: id.taxIdType,
      issuing_agency: id.issuingAgency,
      id_number: id.taxIdValue,
      effective_from: null,
      effective_to: id.taxIdExpiryDateTax.format("YYYY-MM-DD"),
    }));
    return [...citizenStatusIDs, ...governmentIDs, ...taxIDs];
  };

  return {
    citizen: {
      person_id: idRecords.personId,
      citizen_country: idRecords.citizenStatusCountry,
      citizen_status: idRecords.citizenStatus,
      personal_notes: idRecords.personalDetailsNotes,
    },

    binary_gender: {
      person_id: idRecords.personId,
      //TODO ADD COMPENSATION ID
      compensation_id: 1,
      binary_gender: idRecords.binaryGender,
    },

    id_records: returnIDsArray(),
  };
};
// "citizen": {
//   "person_id": 1,
//   "citizen_country": "Canada",
//   "citizen_status": "Permanent Resident",
//   "personal_notes": null
// },
// "binary_gender": { "person_id": 1, "compensation_id": 1, "binary_gender": "Male" },
// "id_records": [
//   {
//     "person_id": 1,
//     "id_record_id": 1,
//     "id_type": "Passport",
//     "issuing_agency": "Government of Canada",
//     "id_number": "string",
//     "effective_from": "2023-11-27",
//     "effective_to": "2023-11-27"
//   },
//   {
//     "person_id": 1,
//     "id_record_id": 1,
//     "id_type": "Passport",
//     "issuing_agency": "Government of Canada",
//     "id_number": "string",
//     "effective_from": null,
//     "effective_to": "2023-11-27"
//   },
//   {
//     "person_id": 1,
//     "id_record_id": 1,
//     "id_type": "Passport",
//     "issuing_agency": "Government of Canada",
//     "id_number": "str23432ing",
//     "effective_from": null,
//     "effective_to": "2023-11-27"
//   },
//   {
//     "person_id": 1,
//     "id_record_id": 1,
//     "id_type": "Passport",
//     "issuing_agency": "Government of Canada",
//     "id_number": "string",
//     "effective_from": null,
//     "effective_to": "2023-11-27"
//   },
//   {
//     "person_id": 1,
//     "id_record_id": 1,
//     "id_type": "Passport",
//     "issuing_agency": "Government of Canada",
//     "id_number": "kjg",
//     "effective_from": null,
//     "effective_to": "2024-01-25"
//   },
//   {
//     "person_id": 1,
//     "id_record_id": 1,
//     "id_type": "Driver Licence",
//     "issuing_agency": "Province of British Columbia",
//     "id_number": "m,",
//     "effective_from": null,
//     "effective_to": "2024-01-25"
//   },
//   {
//     "person_id": 1,
//     "id_record_id": 1,
//     "id_type": "Passport",
//     "issuing_agency": "Government of Canada",
//     "id_number": "Government of Canada",
//     "effective_from": null,
//     "effective_to": "2023-11-28"
//   },
//   {
//     "person_id": 1,
//     "id_record_id": 1,
//     "id_type": "Driver Licence",
//     "id_number": "egrth",
//     "effective_from": null,
//     "effective_to": "2024-01-25"
//   }
// ]
