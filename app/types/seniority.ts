import { GroupingRow } from "./templates";

export type GroupingReportApiResponse = {
  employee_number: string;
  lms: string;
  full_name: string;
  seniority_rank: string;
  status_classification: string;
  wls_date: string;
  phone_number: string;
  email_adress: string;
  employment_detail_id?: string;
};

export type GroupingReportRow = {
  employeeNumber: string;
  lms: string;
  fullName: string;
  seniorityRank: string;
  statusClassification: string;
  wlsDate: string;
  phoneNumber: string;
  emailAdress: string;
  employmentDetailId?: string;
};

export type GroupingReportApiRequest = {
  to_export: boolean;
  report_date_type: number;
  company_id?: number;
  company_division_id?: number;
  department_id?: string;
  work_location_id?: string;
  status_classification?: string;
  organisation_role_id?: string;
  organisation_role_sub_type_id?: string;
  employement_status?: string;
  unionized_employee_only?: boolean;
  include_contact_details?: boolean;
  template_name?: string;

  global_search?: string;
  user_sorting?: string;
  page?: number;
  per_page?: number;
};

export const groupingSelectedToGroupingReportApiRequest = (
  groupingSelected: GroupingRow,
  toExport: boolean,
): GroupingReportApiRequest => {
  return {
    to_export: toExport,
    report_date_type: groupingSelected.reportTypeId ?? 1,
    company_id: groupingSelected.companyId,
    company_division_id: groupingSelected.divisionId,
    department_id: groupingSelected.departments
      .map((item) => item.refDepartmentId)
      .join(";"),
    work_location_id: groupingSelected.workLocations
      .map((item) => item.refWorkLocationId)
      .join(";"),
    status_classification: groupingSelected.employmentclassifications
      .map((item) => item.refEmploymentClassificationId)
      .join(";"),
    organisation_role_id: groupingSelected.organisationroles
      .map((item) => item.refOrganizationRoleId)
      .join(";"),
    organisation_role_sub_type_id: groupingSelected.organisationrolesubtypes
      .map((item) => item.refOrganizationRoleSubtypeId)
      .join(";"),
    employement_status: groupingSelected.employmentstatus
      .map((item) => item.refEmploymentStatusId)
      .join(";"),
    unionized_employee_only: groupingSelected.unionizedEmployeeOnly,
    include_contact_details: groupingSelected.includeContactDetails,
    template_name: groupingSelected.templateName,
  };
};
