import { FC } from "react";
import { StaffingTransactionProps } from "@/app/[lang]/employee/[id]/staffing-transaction/component/PurposeComponent";
import { createSelector } from "reselect";
import { RootState } from "@/app/redux/store";
import { useAppSelector } from "@/app/redux/hooks";
import { PromotionDemotionSummary } from "../common/PromotionDemotionSummary";
import { TransferCreate, TransferState } from "./TransferType";
import { useCreateTransferMutation } from "@/app/redux/features/staffing-transaction/transferApi";
import {
  enqueueErrorsSnackbar,
  enqueueSuccessSnackbar,
} from "@/app/[lang]/workforce/profile-update/util/notistack";

const createTransferSelector = createSelector(
  (state: RootState) => state.staffingTransaction.transactionPurposePage,
  (state: RootState) =>
    state.staffingTransaction.transactionDetails as TransferState,
  (state: RootState) => state.employment,
  (transactionPurposePage, transactionDetails, employment): TransferCreate => {
    return {
      personId: employment.employment?.personId,
      employmentDetailId: transactionPurposePage.employmentDetailId,
      effectiveDate: transactionPurposePage.effectiveDate,
      ...transactionDetails,
    };
  },
);

export const TransferSummary: FC<StaffingTransactionProps> = ({
  staffingTransaction,
}) => {
  const payload = useAppSelector(createTransferSelector);
  const [createTransfer, { isLoading }] = useCreateTransferMutation();

  const handleSubmitToSave = async () => {
    if (!payload.personId) {
      enqueueErrorsSnackbar(
        staffingTransaction.transactionDetails.classificationChange
          .missingPersonID,
      );
      return;
    }

    const success = await createTransfer(payload)
      .unwrap()
      .then(() => true)
      .catch(() => false);

    if (success) {
      enqueueSuccessSnackbar(
        staffingTransaction.transactionDetails.transfer.success,
      );
    } else {
      enqueueErrorsSnackbar(
        staffingTransaction.transactionDetails.transfer.failed,
      );
    }
  };

  return (
    <PromotionDemotionSummary
      staffingTransaction={staffingTransaction}
      handleSubmitToSave={handleSubmitToSave}
      isLoading={isLoading}
    />
  );
};
