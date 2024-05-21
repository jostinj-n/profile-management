import { FC } from "react";
import { StaffingTransactionProps } from "@/app/[lang]/employee/[id]/staffing-transaction/component/PurposeComponent";
import { createSelector } from "reselect";
import { RootState } from "@/app/redux/store";
import { useAppSelector } from "@/app/redux/hooks";
import { PromotionCreate, PromotionState } from "./PromotionType";
import { useCreatePromotionMutation } from "@/app/redux/features/staffing-transaction/promotionApi";
import { PromotionDemotionSummary } from "../common/PromotionDemotionSummary";
import {
  enqueueErrorsSnackbar,
  enqueueSuccessSnackbar,
} from "@/app/[lang]/workforce/profile-update/util/notistack";

const createPromotionSelector = createSelector(
  (state: RootState) => state.staffingTransaction.transactionPurposePage,
  (state: RootState) =>
    state.staffingTransaction.transactionDetails as PromotionState,
  (state: RootState) => state.employment,
  (transactionPurposePage, transactionDetails, employment): PromotionCreate => {
    return {
      personId: employment.employment?.personId,
      employmentDetailId: transactionPurposePage.employmentDetailId,
      effectiveDate: transactionPurposePage.effectiveDate,
      ...transactionDetails,
    };
  },
);

export const PromotionSummary: FC<StaffingTransactionProps> = ({
  staffingTransaction,
}) => {
  const payload = useAppSelector(createPromotionSelector);
  const [createPromotion, { isLoading }] = useCreatePromotionMutation();

  const handleSubmitToSave = async () => {
    if (!payload.personId) {
      enqueueErrorsSnackbar(
        staffingTransaction.transactionDetails.classificationChange
          .missingPersonID,
      );

      return;
    }

    const success = await createPromotion(payload)
      .unwrap()
      .then(() => true)
      .catch(() => false);

    if (success) {
      enqueueSuccessSnackbar(
        staffingTransaction.transactionDetails.promotion.success,
      );
    } else {
      enqueueErrorsSnackbar(
        staffingTransaction.transactionDetails.promotion.failed,
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
