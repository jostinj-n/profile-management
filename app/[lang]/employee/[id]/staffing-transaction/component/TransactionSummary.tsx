import { useAppSelector } from "@/app/redux/hooks";
import {
  purposeMap,
  StaffingTransactionProps,
} from "@/app/[lang]/employee/[id]/staffing-transaction/component/PurposeComponent";
import { createSelector } from "reselect";
import { RootState } from "@/app/redux/store";
import { StaffingTransactionPurpose } from "@/app/[lang]/employee/[id]/staffing-transaction/component/TransactionPurposeType";

const summaryComponentSelector = createSelector(
  (state: RootState) =>
    state.staffingTransaction.transactionPurposePage.purpose,
  (purpose: StaffingTransactionPurpose) => purposeMap[purpose].summary,
);

export default function TransactionSummary({
  staffingTransaction,
}: Readonly<StaffingTransactionProps>) {
  const SummaryComponent = useAppSelector(summaryComponentSelector);

  return <SummaryComponent staffingTransaction={staffingTransaction} />;
}
