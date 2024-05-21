import { Order } from "../component/table/table-header";

export type Template = {
  airport_id: number;
  name: string;
  work_location: string;
  is_status_classification: boolean;
  role_classification: string;
  work_pre_cert: boolean;
  terminal: string;
  employment_classification: string;
  non_tsc: string;
  created_by: string;
  created_at: any;
  template_id: number;
  is_record_active: boolean;
};

export type GroupingApiRequest = {
  company_id?: number;
  company_division_id?: number;
  work_location_id?: number;
  report_date_type_id?: number;
  global_search?: string;
  user_sorting?: string;
  page?: number;
  per_page?: number;
  order?: Order;
  orderBy?: number;
};

export type GroupingRow = {
  templateId: number;
  templateName: string;
  companyId: number;
  companyName: string;
  divisionId: number;
  divisionName: string;

  reportTypeId: number;
  reportTypeName: string;

  unionizedEmployeeOnly: boolean;
  includeContactDetails: boolean;

  workLocations: { refWorkLocationId: number; name?: string }[];
  departments: { refDepartmentId: number; name?: string }[];
  employmentstatus: {
    refEmploymentStatusId: number;
    name?: string;
  }[];
  employmentclassifications: {
    refEmploymentClassificationId: number;
    name?: string;
  }[];
  organisationroles: {
    refOrganizationRoleId: number;
    name?: string;
  }[];
  organisationrolesubtypes: {
    refOrganizationRoleSubtypeId: number;
    name?: string;
  }[];
};
