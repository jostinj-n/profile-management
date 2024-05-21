import { FC } from "react";
import { StaffingTransactionProps } from "@/app/[lang]/employee/[id]/staffing-transaction/component/PurposeComponent";
import { createSelector } from "reselect";
import { RootState } from "@/app/redux/store";

import DataSummary, {
  DataSummaryType,
} from "@/app/component/staffingTransaction/DataSummary";
import ApprovalUser from "@/app/component/staffingTransaction/ApprovalUser";
import BackSubmitButtons from "@/app/component/staffingTransaction/BackSubmitButtons";
import { Dictionary } from "@/dictionaries/dictionaries";
import {
  SalaryRevisionCreate,
  SalaryRevisionState,
} from "./SalaryRevisionType";
import { useCreateSalaryRevisionMutation } from "@/app/redux/features/staffing-transaction/salaryRevisionApi";
import { useAppSelector } from "@/app/redux/hooks";
import {
  enqueueErrorsSnackbar,
  enqueueSuccessSnackbar,
} from "@/app/[lang]/workforce/profile-update/util/notistack";

const salaryRevisionSummarySelector = (
  staffingTransaction: Dictionary["workforce"]["staffingTransaction"],
) =>
  createSelector(
    (state: RootState) => state.staffingTransaction.transactionDetails,
    (transactionDetails): DataSummaryType[] => {
      if (!transactionDetails) {
        return [];
      }
      const salaryRevisionLabels =
        staffingTransaction.transactionDetails.salaryRevision;
      const salaryRevision = transactionDetails as SalaryRevisionState;
      return [
        {
          label: salaryRevisionLabels.current_catsa_job_level.label,
          value: salaryRevision.currentCatsaJobLevel ?? "",
        },
        {
          label: salaryRevisionLabels.new_catsa_job_level.label,
          value: salaryRevision.newCatsaJobLevel,
        },
        {
          label: salaryRevisionLabels.explanation.label,
          value: salaryRevision.explanation ?? "",
        },
      ];
    },
  );

const createsalaryRevisionSelector = createSelector(
  (state: RootState) => state.staffingTransaction.transactionPurposePage,
  (state: RootState) =>
    state.staffingTransaction.transactionDetails as SalaryRevisionState,
  (state: RootState) => state.employment,
  (
    transactionPurposePage,
    transactionDetails,
    employment,
  ): SalaryRevisionCreate => ({
    personId: employment.employment?.personId,
    employmentDetailId: transactionPurposePage.employmentDetailId,
    EffectiveDate: transactionPurposePage.effectiveDate,
    newCatsaJobLevel: transactionDetails.newCatsaJobLevel,
    explanation: transactionDetails.explanation,
  }),
);

export const SalaryRevisionSummary: FC<StaffingTransactionProps> = ({
  staffingTransaction,
}) => {
  const summaryData = useAppSelector(
    salaryRevisionSummarySelector(staffingTransaction),
  );
  const payload = useAppSelector(createsalaryRevisionSelector);
  const [createSalaryRevision, { isLoading }] =
    useCreateSalaryRevisionMutation();

  const handleSubmitToSave = async () => {
    if (!payload.personId) {
      enqueueErrorsSnackbar(
        staffingTransaction.transactionDetails.classificationChange
          .missingPersonID,
      );

      return;
    }

    const success = await createSalaryRevision(payload)
      .unwrap()
      .then(() => true)
      .catch(() => false);

    if (success) {
      enqueueSuccessSnackbar(
        staffingTransaction.transactionDetails.salaryRevision.success,
      );
    } else {
      enqueueErrorsSnackbar(
        staffingTransaction.transactionDetails.salaryRevision.failed,
      );
    }
  };

  return (
    <>
      <DataSummary
        data={summaryData}
        title={staffingTransaction.summary.title}
      />
      <ApprovalUser />
      <BackSubmitButtons
        buttonLabels={staffingTransaction.button}
        handleSubmitToSave={handleSubmitToSave}
        isLoading={isLoading}
      />
    </>
  );
};
