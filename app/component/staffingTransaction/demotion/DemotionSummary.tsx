import { FC } from "react";
import { StaffingTransactionProps } from "@/app/[lang]/employee/[id]/staffing-transaction/component/PurposeComponent";
import { createSelector } from "reselect";
import { RootState } from "@/app/redux/store";
import { useAppSelector } from "@/app/redux/hooks";
import { DemotionCreate, DemotionState } from "./DemotionType";
import { PromotionDemotionSummary } from "../common/PromotionDemotionSummary";
import { useCreateDemotionMutation } from "@/app/redux/features/staffing-transaction/demotionApi";
import {
  enqueueErrorsSnackbar,
  enqueueSuccessSnackbar,
} from "@/app/[lang]/workforce/profile-update/util/notistack";

const createPomotionSelector = createSelector(
  (state: RootState) => state.staffingTransaction.transactionPurposePage,
  (state: RootState) =>
    state.staffingTransaction.transactionDetails as DemotionState,
  (state: RootState) => state.employment,
  (transactionPurposePage, transactionDetails, employment): DemotionCreate => {
    return {
      personId: employment.employment?.personId,
      employmentDetailId: transactionPurposePage.employmentDetailId,
      effectiveDate: transactionPurposePage.effectiveDate,
      ...transactionDetails,
    };
  },
);

export const DemotionSummary: FC<StaffingTransactionProps> = ({
  staffingTransaction,
}) => {
  const payload = useAppSelector(createPomotionSelector);
  const [createDemotion, { isLoading }] = useCreateDemotionMutation();

  const handleSubmitToSave = async () => {
    if (!payload.personId) {
      enqueueErrorsSnackbar(
        staffingTransaction.transactionDetails.classificationChange
          .missingPersonID,
      );
      return;
    }

    const success = await createDemotion(payload)
      .unwrap()
      .then(() => true)
      .catch(() => false);
    if (success) {
      enqueueSuccessSnackbar(
        staffingTransaction.transactionDetails.demotion.success,
      );
    } else {
      enqueueErrorsSnackbar(
        staffingTransaction.transactionDetails.demotion.failed,
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
