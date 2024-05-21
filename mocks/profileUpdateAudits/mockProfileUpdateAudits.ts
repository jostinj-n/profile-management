import { ProfileUpdateAuditAPIResponse } from "@/app/types/profileUpdateAudits";

export const mockProfileUpdateAudits: ProfileUpdateAuditAPIResponse = {
  page: 0,
  limit: 10,
  total: 6,
  pages: 1,
  items: [
    {
      person_id: 1,
      edit_log_id: 0,
      service_request_reference: "string",
      edit_request_type: "contact_detail",
      effective_date: "2021-09-01",
      updated_by: "John Doe",
    },
    {
      person_id: 1,
      edit_log_id: 1,
      service_request_reference: "string",
      edit_request_type: "person_profile",
      effective_date: "2022-03-21",
      updated_by: "Mary Jane",
    },
    {
      person_id: 1,
      edit_log_id: 2,
      service_request_reference: "string",
      edit_request_type: "banking_information",
      effective_date: "2022-12-01",
      updated_by: "Sally Smith",
    },
    {
      person_id: 1,
      edit_log_id: 3,
      service_request_reference: "string",
      edit_request_type: "seniority",
      effective_date: "2023-02-12",
      updated_by: "Walter White",
    },
    {
      person_id: 1,
      edit_log_id: 4,
      service_request_reference: "string",
      edit_request_type: "employment_detail",
      effective_date: "2023-04-01",
      updated_by: "Frank Smith",
    },
    {
      person_id: 1,
      edit_log_id: 5,
      service_request_reference: "string",
      edit_request_type: "government_id",
      effective_date: "2023-09-01",
      updated_by: "Robert Paulson",
    },
  ],
};