import { useAppSelector } from "@/app/redux/hooks";

import ApprovalUser from "../ApprovalUser";
import BackSubmitButtons from "../BackSubmitButtons";
import DataSummary, { DataSummaryType } from "../DataSummary";
import { useEffect, useState } from "react";
import { Dictionary } from "@/dictionaries/dictionaries";
import { createSelector } from "reselect";
import { RootState } from "@/app/redux/store";

import { OtherState } from "./OtherType";
import { useCreateOtherMutation } from "@/app/redux/features/staffing-transaction/otherApi";
import {
  enqueueErrorsSnackbar,
  enqueueSuccessSnackbar,
} from "@/app/[lang]/workforce/profile-update/util/notistack";

const getSummaryData = (
  otherData: OtherState,
  reason: string | undefined,
  staffingTransaction: Dictionary["workforce"]["staffingTransaction"],
): DataSummaryType[] => {
  return [
    {
      label: staffingTransaction.transactionPurpose.field.reason.label,
      value: reason,
    },
    {
      label: staffingTransaction.transactionDetails.other.roe_code.label,
      value: otherData.roe_code,
    },
    {
      label:
        staffingTransaction.transactionDetails.other.code_description.label,
      value: otherData.code_description,
    },
    {
      label: staffingTransaction.transactionDetails.other.explanation.label,
      value: otherData.explanation,
    },
  ] as DataSummaryType[];
};

const createLeaveAbsenceSelector = createSelector(
  (state: RootState) =>
    state.staffingTransaction.transactionDetails as OtherState,
  (state: RootState) => state.staffingTransaction.transactionPurposePage,
  (state: RootState) => state.employment.employment?.personId,
  (transactionDetails, transactionPurposePage, personId) => {
    return {
      transactionDetails,
      transactionPurposePage,
      personId,
    };
  },
);

type Props = {
  staffingTransaction: Dictionary["workforce"]["staffingTransaction"];
};
export default function OtherSummary({ staffingTransaction }: Readonly<Props>) {
  const { transactionDetails, transactionPurposePage, personId } =
    useAppSelector(createLeaveAbsenceSelector);

  const [data, setData] = useState<DataSummaryType[]>([]);
  const [createOther] = useCreateOtherMutation();

  const handleSubmitToSave = async () => {
    try {
      if (personId)
        await createOther({
          ...transactionDetails,
          person_id: personId,
          employment_detail_id: transactionPurposePage.employmentDetailId,
          effective_date: transactionPurposePage.effectiveDate,
          reason: transactionPurposePage.reason,
        }).unwrap();

      enqueueSuccessSnackbar(
        staffingTransaction.transactionDetails.other.success,
      );
    } catch (error) {
      enqueueErrorsSnackbar(
        staffingTransaction.transactionDetails.other.failed,
      );
    }
  };

  useEffect(() => {
    setData(
      getSummaryData(
        transactionDetails,
        transactionPurposePage.reason,
        staffingTransaction,
      ),
    );
  }, [transactionDetails, staffingTransaction, transactionPurposePage]);

  return (
    <>
      <DataSummary data={data} title={staffingTransaction.summary.title} />
      <ApprovalUser />
      <BackSubmitButtons
        buttonLabels={staffingTransaction.button}
        handleSubmitToSave={handleSubmitToSave}
      />
    </>
  );
}
