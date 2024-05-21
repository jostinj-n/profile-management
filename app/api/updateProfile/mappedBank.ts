import { Bank } from "@/app/types/bank";

export const mappedBank = (bank: Bank) => ({
  //TODO ADD BANKING DETAILS AND MAKE SURE MOCK RETURN THESE TWO IDS
  person_id: 1,
  banking_detail_id: 1,
  company: bank.company,
  payment_type_code: bank.paymentTypeCode,
  bank_name: bank.bankName,
  account_number: bank.accountNumber,
  transit_number: bank.transitNumber,
  is_record_active: bank.isActive,
});
