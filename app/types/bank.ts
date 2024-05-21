export type Bank = {
  personId: number;
  bankingDetailId: number;
  isActive: boolean;
  company: string;
  bankName: string;
  paymentTypeCode: string;
  transitNumber: string;
  accountNumber: string;
  IBAN?: string;
  SWIFT?: string;
  accountType?: string;
};
