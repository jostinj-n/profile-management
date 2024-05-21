export type EmployeeDocument = {
  personId: number;
  idType: string;
  idNumber: string;
  issuingAgency: string;
  effectiveFrom: string;
  effectiveTo: string;
};

export type SeniorityDetailsAPIResponse = {
  header: EmployeeProfileAPIHeaderResponse;
  seniority_detail: SeniorityDetailsAPI[];
};

export type SeniorityProfileUpdateAPI = {
  header: SeniorityHeader;
  seniorityDetail: SeniorityDetailsAPIUpdate[];
};

export type SeniorityDetailsAPI = {
  person_id: number;
  employment_detail_id: number;
  company: string;
  division: string;
  date_type: string;
  seniority_date: string;
  seniority_tie_breaker: number;
  seniority_suppress_flag: boolean;
  notes: string;
  updated_by: string | null;
  updated_at: string | null;
};

export type SeniorityDetailsAPIUpdate = {
  personId: number;
  employmentDetailId: number;
  company: string;
  division: string;
  dateType: string;
  seniorityDate: string;
  seniorityTieBreaker: number;
  senioritySuppressFlag: boolean;
  notes: string;
  updatedBy: string | null;
  updatedAt: string | null;
};

export type SeniorityDetails = {
  personId: number;
  employmentInformationStatus: string;
  employmentDetailId: number;
  company: string;
  division: string;
  dateType: string;
  seniorityDate: string;
  seniorityTieBreaker: number;
  senioritySuppressFlag: boolean;
  notes: string;
  updatedBy: string;
  updatedAt: string;
};

export interface EmploymentLastUpdates {
  name: string;
  date: string;
  status: string;
}

export interface Employee {
  person_id: number;
  last_name: string;
  first_name: string;
  middle_name: string;
  preferred_name: string;
  former_first_name: string;
  former_last_name: string;
  gender: string;
  lms: number;
  status_classification: string;
  status: string;
  rank: number;
  work_location: string;
  language: string;
  employee_number: string;
  employment_status: string;
  personal_pronoun: string;
  job_status: string;
  resource_type: string;
  location: string;
  company_name: string;
  primary_language_of_communication: string;
  department: string;
  division: string;
  bilingual: boolean;
  species: string;
  notes: string;
}

export type BasicEmployee = {
  person_id: number;
  first_name: string;
  preferred_name: string;
  last_name: string;
  employee_number: string;
  work_location: string;
  job_status: string;
  employment_status: string;
};

export type EmployeesAPIResponse = {
  page: number;
  limit: number;
  total: number;
  pages: number;
  items: BasicEmployee[];
};

export type EmployeeProfileAPIHeaderResponse = {
  person_id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  preferred_name: string;
  personal_pronoun: string;
  employee_number: string;
  lms_number: number;
  status_classification: string;
  employment_status: string;
  company_name: string;
  division_name: string;
  work_location_name: string;
  department: string;
  primary_language_of_communication: string;
};

export type SeniorityHeader = {
  personId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  preferredName: string;
  personalPronoun: string;
  employeeNumber: string;
  lmsNumber: number;
  statusClassification: string;
  employmentStatus: string;
  companyName: string;
  divisionName: string;
  workLocationName: string;
  department: string;
  primaryLanguageOfCommunication: string;
};
export type UserProfileAPIResponse = {
  person_id: number;
  resource_type: string;
  preferred_name: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  notes: string;
  gender: string;
  former_first_name: string;
  former_last_name: string;
  species: string;
};

export type EmployeeProfileAPIResponse = {
  header: EmployeeProfileAPIHeaderResponse;
  user_profile: UserProfileAPIResponse;
};

export type EmployeeProfile = {
  resourceType: string;
  firstName: string;
  middleName: string;
  lastName: string;
  preferredName: string;
  gender: string;
  imageDate: string;
  formerFirstName: string;
  formerLastName: string;
  species: string;
  notes: string;
};

export type EmploymentInformation = {
  personId: number;
  employmentNumber: string;
  location: string;
  employmentStatus: string;
  jobStatus: string;
  department: string;
  division: string;
};

export type EmployeePersonalDetailsAPIHeader = {
  person_id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  preferred_name: string;
  personal_pronoun: string;
  employee_number: string;
  lms_number: string;
  status_classification: string;
  employment_status: string;
  company_name: string;
  division_name: string;
  work_location_name: string;
  department: string;
  primary_language_of_communication: string;
};
export type PersonalDetailAPI = {
  person_id: number;
  date_of_birth: string;
  citizen_status: string;
  citizen_country: string;
  notes: string | null;
};
export type PersonalDetailAPIProfileUpdate = {
  person_id: number;
  date_of_birth: string;
  citizen_status: string;
  citizen_country: string;
  notes?: string;
  gender: string;
  gender_binary: string;
};
export type PersonalDetailIdRecordsAPI = {
  person_id: number;
  id_type: string;
  id_number: string;
  issuing_agency: string;
  effective_from: string | null;
  effective_to: string;
};

export type IdRecords = {
  person_id: number;
  id_type: string;
  code: string;
  id_number: string;
  issuing_agency: string;
  group_name: string;
  effective_from: string | null;
  effective_to: string;
};

export type PersonalDetailBankingDetail = {
  person_id: number;
  company: string;
  institution_number: string;
  transit_number: string;
  account_number: string;
  account_type: string;
  payment_type_code: string;
  bank_name: string;
  routing_number: string;
  iban: string;
  swift?: string;
  is_active: boolean;
};

export type EmployeePersonalDetailsAPI = {
  header: EmployeePersonalDetailsAPIHeader;
  personal_detail: PersonalDetailAPI;
  id_records: PersonalDetailIdRecordsAPI[];
  banking_detail: PersonalDetailBankingDetail[];
};

export type EmployeePersonalDetailsProfileUpdate = {
  header: EmployeePersonalDetailsAPIHeader;
  personal_detail: PersonalDetailAPIProfileUpdate;
  id_records: IdRecords[];
  banking_detail: PersonalDetailBankingDetail[];
};

export type EmployeePersonalDetails = {
  dateOfBirth: string;
  gender: string;
  taxIdType: string;
  taxIdValue: string;
  taxIdExpiry: string;
  sin_ssn: string;
  species: string;
  country: string;
  passport_id: string;
  passport_expiry_date: string;
};

export type EmployeeBankingInformation = {
  isActive: boolean;
  company: string;
  bankName: string;
  paymentTypeCode: string;
  routingNumber: string;
  accountNumber: string;
  iban?: string;
  swift?: string;
  accountType?: string;
};

export type EmployeeContactDetails = {
  personId: number;
  emailCommunicationAllowed: boolean;
  personalDeviceType: string;
  primaryPhoneNumber: string;
  primaryPhoneHasSms: boolean;
  isSmsAllowedPrimary: boolean;
  primaryEmailAddress: string;
  isEmailAllowedPrimary: boolean;
  secondaryDeviceType: string;
  secondaryPhoneNumber: string;
  secondaryPhoneHasSms: boolean;
  isSMSAllowedSecondary: boolean;
  secondaryEmailAddress: string;
  isEmailAllowedSecondary: boolean;
};

export type EmployeeContactAddress = {
  personId: number;
  residentialAddress: string;
  isMailingAddressSameAsResidential: boolean;
  mailingAddress: string;
};

export type EmergencyContact = {
  personalPronoun: string;
  emergencyContactId: number;
  primaryFlag: boolean;
  firstName: string;
  lastName: string;
  relationship: string;
  otherRelationship: string;
  languageOfCommunication: string;
  languageProficiency: string;
  contactType: string;
  phoneNumber: string;
  emailAddress: string;
  notes: string;
};

export type EmployeeCitizenDetails = {
  citizen_status: string;
  country: string;
};

export type EmployeeCompensation = {
  personId: number;
  binaryGender: string;
  issuedPassType: string;
  reimbursementType: string;
  issuingAgency: string;
  reimbursementPercentage: string;
  passMonthlyCost: string;
  effectiveFrom: string;
  effectiveTo: string;
  passNumber: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleColor: string;
  licensePlate: string;
};

export type EmployeeCompensationAPI = {
  person_id: number;
  binary_gender: string;
  issued_pass_type: string;
  reimbursement_type: string;
  issuing_agency: string;
  pass_monthly_cost: string;
  effective_from: string;
  effective_to: string;
  pass_number: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_color: string;
  licence_plate: string;
};

export type EmployeeCompensationAPIResponse = {
  header: EmployeeProfileAPIHeaderResponse;
  compensation_detail: EmployeeCompensationAPI[];
};
export type ContactDetails = {
  contactDetails: EmployeeContactDetails;
  address: EmployeeContactAddress;
  emergencyContacts: EmergencyContact[];
};
