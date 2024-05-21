import { EmployeeProfileAPIResponse } from "@/app/types/employee";

export const mockEmployeeProfile: EmployeeProfileAPIResponse = {
  header: {
    person_id: 1,
    first_name: "First2",
    middle_name: "Middle2",
    last_name: "Last2",
    preferred_name: "Test2",
    personal_pronoun: "He/Him",
    employee_number: "100",
    lms_number: 90210,
    status_classification: "Full Time",
    employment_status: "Active",
    company_name: "GardaWorld",
    division_name: "Aviation services",
    work_location_name: "Toronto",
    department: "Information Technology",
    primary_language_of_communication: "English",
  },
  user_profile: {
    person_id: 1,
    resource_type: "Employee",
    preferred_name: "Test2",
    first_name: "First2",
    middle_name: "Middle2",
    last_name: "Last2",
    notes: "notes2",
    gender: "Male",
    former_first_name: "FormerFirst2",
    former_last_name: "FormerLast2",
    species: "Homo Sapien",
  },
};
