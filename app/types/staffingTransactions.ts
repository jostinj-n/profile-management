export type StaffingTransaction = {
  personId: number;
  recordId: number;
  effectiveDate: string;
  employmentRecord: string;
  purpose: string;
  dateExpectedToReturn: string;
  approvedBy: string;
  explanation: string;
};

export type StaffingTransactionAPI = {
  person_id: number;
  record_id: number;
  effective_date: string;
  employment_record: string;
  purpose: string;
  date_expected_to_return: string;
  approved_by: string;
  explanation: string;
};

export type StaffingTransactionAPIResponse = {
  page: number;
  limit: number;
  total: number;
  pages: number;
  items: StaffingTransactionAPI[];
};