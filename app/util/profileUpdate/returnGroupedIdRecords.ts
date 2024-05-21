import { EmployeePersonalDetailsProfileUpdate } from "@/app/types/employee";
import dayjs from "dayjs";

export const returnGroupedIdRecords = (
  rawResponse: EmployeePersonalDetailsProfileUpdate,
) => {
  const citizenStatusIDs = rawResponse.id_records
    .filter((id) => id.group_name === "Citizen")
    .map((id) => ({
      personId: id.person_id,
      groupName: id.group_name,
      citizenStatusIdType: id.id_type,
      citizenStatusIdNumber: id.id_number,
      citizenStatusEffectiveFrom: dayjs(id.effective_from),
      citizenStatusEffectiveTo: dayjs(id.effective_to),
      issuingAgency: id.issuing_agency,
    }));
  const governmentIDs = rawResponse.id_records
    .filter((id) => id.group_name === "Government")
    .map((id) => ({
      personId: id.person_id,
      groupName: id.group_name,
      typeOfId: id.id_type,
      issuedByAgency: id.issuing_agency,
      issuedValue: id.id_number,
      expiryDate: dayjs(id.effective_to),
    }));
  const taxIDs = rawResponse.id_records
    .filter((id) => id.group_name === "Tax")
    .map((id) => ({
      personId: id.person_id,
      groupName: id.group_name,
      taxIdType: id.id_type,
      taxIdValue: id.issuing_agency,
      taxIdExpiryDateTax: dayjs(id.effective_to),
      issuingAgency: id.issuing_agency,
    }));
  return {
    citizenStatusIDs,
    taxIDs,
    governmentIDs,
  };
};
