import { FC } from "react";
import { StaffingTransactionProps } from "@/app/[lang]/employee/[id]/staffing-transaction/component/PurposeComponent";

export const ReturnToWorkSummary: FC<StaffingTransactionProps> = ({
  staffingTransaction,
}) => {
  return <>{staffingTransaction.transactionSummary.returnToWork.example}</>;
};
