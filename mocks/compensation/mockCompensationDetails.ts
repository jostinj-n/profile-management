import { EmployeeCompensationAPIResponse } from "@/app/types/employee";

export const mockCompensationDetails: EmployeeCompensationAPIResponse = {
  header: {
    person_id: 2,
    first_name: "string",
    middle_name: "string",
    last_name: "string",
    preferred_name: "string",
    personal_pronoun: "He/Him",
    employee_number: "100",
    lms_number: 5654,
    status_classification: "Full-Time",
    employment_status: "Active",
    company_name: "Canada - GardaWorld Security Screening Inc",
    division_name: "Aviation services",
    work_location_name: "Ottawa (MacDonald-Cartier International)",
    department: "Information Technology",
    primary_language_of_communication: "English",
  },
  compensation_detail: [
    {
      person_id: 2,
      binary_gender: "Male",
      issued_pass_type: "Parking",
      reimbursement_type: "Percentage",
      issuing_agency: "Parking authority",
      pass_monthly_cost: "0.00",
      effective_from: "2023-11-27",
      effective_to: "2023-11-27",
      pass_number: "string",
      vehicle_make: "Honda",
      vehicle_model: "Honda",
      vehicle_color: "White",
      licence_plate: "string",
    },
  ],
};