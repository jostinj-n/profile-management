import { EmploymentDetailsApiResponse } from "@/app/redux/features/staffing-transaction/employmentDetailsApi";

export const mockEmploymentDetailsTransaction: EmploymentDetailsApiResponse = {
  employment_detail_id: 0,
  company: "The company",
  division: "The division",
  work_location_code: "Some work location code",
  work_location_name: "some work location name",
  employment_status: "an employment status",
  employment_classification: "an employment classification",
  department: "the department",
  catsa_job_level: "the job level",
  vacation_entitlement_date: "2023-12-22",
  is_position_unionized: true,
  organisational_role: "an organisational role",
  organisational_role_subtype: "an organisational role subtype",
  job_title: "the job title",
};
