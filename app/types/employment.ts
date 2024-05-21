import { EmployeeProfileAPIHeaderResponse } from "./employee";

export type AssociatedId = {
  personId: number;
  otherEmployeeAssociatedIdType: string;
  otherEmployeeAssociatedIdValues: string;
  otherEmployeeAssociatedIdExpiryDates: string;
};

export type EmploymentDetail = {
  personId: number;
  primaryWorkLocationCode: string;
  organizationalRole: string;
  organizationalRoleSubtype: string;
  statusClassification: string;
  employmentStatus: string;
  companyName: string;
  divisionName: string;
  jobTitle: string;
  unionizedPosition: boolean;
  jobHireDate: string;
  firstDayOfWorkOnRole: string;
  lastDayOfWorkOnRole: string | null;
  catsaJobLevel: string;
  otherWorkLocations: string;
  employmentDetailId: number;
};

export type Employment = {
  personId: number;
  isBilingualFlag: boolean;
  originalHireDate: string;
  probationDate: string;
  terminationDate: string | null;
  workEmailAddress: string;
  workContactDeviceType: string;
  workDevicePhoneNumber: string;
  isActiveHAndS: boolean;
  isActiveUnionSteward: boolean;
  languages: string;
  employmentDetails: EmploymentDetail[];
  associatedIds: AssociatedId[];
};

export type AssociatedIdAPI = {
  person_id: number;
  other_employee_associated_id_type: string;
  other_employee_associated_id_values: string;
  other_employee_associated_id_expiry_dates: string;
};

export type EmploymentDetailAPI = {
  person_id: number;
  primary_work_location_code: string;
  organizational_role: string;
  organizational_role_subtype: string;
  status_classification: string;
  employment_status: string;
  company_name: string;
  division_name: string;
  job_title: string;
  unionized_position: boolean;
  job_hire_date: string;
  first_day_of_work_on_role: string;
  last_day_of_work_on_role: string | null;
  catsa_job_level: string;
  other_work_locations: string;
  employment_detail_id: number;
};

export type EmploymentAPIHeader = {
  person_id: number;
  is_bilingual_flag: boolean;
  original_hire_date: string;
  probation_date: string;
  termination_date: string | null;
  work_email_address: string;
  work_contact_device_type: string;
  work_device_phone_number: string;
  is_active_h_and_s: boolean;
  is_active_union_steward: boolean;
  languages: string;
};

export type EmploymentAPIResponse = {
  header: EmployeeProfileAPIHeaderResponse;
  employment_header: EmploymentAPIHeader;
  employee_associated_ids: AssociatedIdAPI[];
  employment_detail: EmploymentDetailAPI[];
};
