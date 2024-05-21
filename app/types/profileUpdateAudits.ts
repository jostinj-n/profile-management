export type ProfileUpdateAudit = {
  personId: number;
  editLogId: number;
  effectiveDate: string;
  serviceRequestReference: string;
  editRequestType: string;
  updatedBy: string;
};

export type ProfileUpdateAuditAPI = {
  person_id: number;
  edit_log_id: number;
  effective_date: string;
  service_request_reference: string;
  edit_request_type: string;
  updated_by: string;
};

export type ProfileUpdateAuditAPIResponse = {
  page: number;
  limit: number;
  total: number;
  pages: number;
  items: ProfileUpdateAuditAPI[];
};