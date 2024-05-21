import { FC } from "react";
import { StaffingTransactionProps } from "@/app/[lang]/employee/[id]/staffing-transaction/component/PurposeComponent";
import { createSelector } from "reselect";
import { RootState } from "@/app/redux/store";
import {
  ClassificationChangeFrontPayload,
  ClassificationChangeState,
} from "@/app/component/staffingTransaction/classificationChange/ClassificationChangeType";
import { useAppSelector } from "@/app/redux/hooks";
import DataSummary, {
  DataSummaryType,
} from "@/app/component/staffingTransaction/DataSummary";
import ApprovalUser from "@/app/component/staffingTransaction/ApprovalUser";
import BackSubmitButtons from "@/app/component/staffingTransaction/BackSubmitButtons";
import { Dictionary } from "@/dictionaries/dictionaries";

import { usePostClassificationChangeMutation } from "@/app/redux/features/staffing-transaction/classificationChangeApi";
import { useRouter } from "next/navigation";
import {
  enqueueErrorsSnackbar,
  enqueueSuccessSnackbar,
} from "@/app/[lang]/workforce/profile-update/util/notistack";

const classificationChangeDataSelector = (
  staffingTransaction: Dictionary["workforce"]["staffingTransaction"],
) =>
  createSelector(
    (state: RootState) => state.staffingTransaction.transactionDetails,
    (transactionDetails): DataSummaryType[] => {
      if (!transactionDetails) {
        return [];
      }
      const {
        department,
        vacationEntitlementDate,
        jobLevel,
        employmentStatus,
        statusClassification,
        explanation,
      } = staffingTransaction.transactionDetails.classificationChange;
      const classChange = transactionDetails as ClassificationChangeState;
      return [
        { label: department.label, value: classChange.department },
        {
          label: vacationEntitlementDate.label,
          value: classChange.vacationEntitlementDate,
        },
        { label: jobLevel.label, value: classChange.jobLevel },
        { label: employmentStatus.label, value: classChange.employmentStatus },
        {
          label: statusClassification.label,
          value: classChange.statusClassification,
        },
        { label: explanation.label, value: classChange.explanation },
      ];
    },
  );

const createClassificationChangeSelector = createSelector(
  (state: RootState) => state.staffingTransaction.transactionPurposePage,
  (state: RootState) =>
    state.staffingTransaction.transactionDetails as ClassificationChangeState,
  (state: RootState) => state.employment,
  (
    transactionPurposePage,
    transactionDetails,
    employment,
  ): ClassificationChangeFrontPayload => {
    return {
      personId: employment.employment?.personId,
      employmentDetailId: transactionPurposePage.employmentDetailId,
      effectiveDate: transactionPurposePage.effectiveDate,
      newDepartment: transactionDetails.department,
      newVacationEntitlementDate: transactionDetails.vacationEntitlementDate,
      newCatsaJobLevel: transactionDetails.jobLevel,
      newEmploymentClassification: transactionDetails.statusClassification,
      newEmploymentStatus: transactionDetails.employmentStatus,
      explanation: transactionDetails.explanation,
    };
  },
);

export const ClassificationChangeSummary: FC<StaffingTransactionProps> = ({
  staffingTransaction,
}) => {
  const router = useRouter();

  const summaryData = useAppSelector(
    classificationChangeDataSelector(staffingTransaction),
  );
  const payload = useAppSelector(createClassificationChangeSelector);
  const [postClassificationChange, { isLoading }] =
    usePostClassificationChangeMutation();

  const handleSubmitToSave = async () => {
    if (!payload.personId) {
      enqueueErrorsSnackbar(
        staffingTransaction.transactionDetails.classificationChange
          .missingPersonID,
      );

      return;
    }

    const success = await postClassificationChange(payload)
      .unwrap()
      .then(() => true)
      .catch(() => false);
    if (success) {
      enqueueSuccessSnackbar(
        staffingTransaction.transactionDetails.classificationChange.success,
      );
    } else {
      enqueueErrorsSnackbar(
        staffingTransaction.transactionDetails.classificationChange.failed,
      );
    }

    if (success) {
      router.push(`/employee/${payload.personId}`);
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
