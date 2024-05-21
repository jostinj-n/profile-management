import dayjs from "dayjs";

export const StaffingTransactionValues = [
  "Classification Change",
  "Leave of absence",
  "Return to Work",
  "Resignation",
  "Promotion",
  "Termination",
  "Salary Revision",
  "Parking Change",
  "Demotion",
  "Transfer",
  "Other",
] as const;

export type StaffingTransactionPurpose =
  (typeof StaffingTransactionValues)[number];

export type TransactionPurposeState = {
  purpose: StaffingTransactionPurpose;
  purposeOld?: StaffingTransactionPurpose;
  reason?: string;
  effectiveDate: string;
  employmentDetailId: number;
};

export const transactionPurposeInitial: TransactionPurposeState = {
  purpose: "Classification Change",
  effectiveDate: dayjs().format(),
  employmentDetailId: 0,
  reason: "",
};
