import { useAppSelector } from "@/app/redux/hooks";

import ApprovalUser from "../ApprovalUser";
import BackSubmitButtons from "../BackSubmitButtons";
import DataSummary, { DataSummaryType } from "../DataSummary";
import { useEffect, useState } from "react";
import { Dictionary } from "@/dictionaries/dictionaries";
import { useGetFilterQuery } from "@/app/redux/features/seniority/filtersApi";
import { FilterResponse } from "@/app/api/seniority/filters/[name]/route";
import { createSelector } from "reselect";
import { RootState } from "@/app/redux/store";

import { useRouter } from "next/navigation";
import { TerminationState } from "./TerminationType";
import { useCreateTerminationMutation } from "@/app/redux/features/staffing-transaction/terminationApi";
import { StaffingTransactionProps } from "@/app/[lang]/employee/[id]/staffing-transaction/component/PurposeComponent";
import {
  enqueueErrorsSnackbar,
  enqueueSuccessSnackbar,
} from "@/app/[lang]/workforce/profile-update/util/notistack";

const getSummaryData = (
  TerminationData: TerminationState,
  dataEmploymentStatus: FilterResponse[] | undefined,
  staffingTransaction: Dictionary["workforce"]["staffingTransaction"],
): DataSummaryType[] => {
  const employmentStatus = dataEmploymentStatus?.find(
    (item) => item.id == TerminationData.employment_status,
  );
  return [
    {
      label:
        staffingTransaction.transactionDetails.termination.last_day_work_in_role
          .label,
      value: TerminationData.last_day_work_in_role,
    },
    {
      label: staffingTransaction.transactionDetails.termination.reason.label,
      value: TerminationData.reason,
    },
    {
      label:
        staffingTransaction.transactionDetails.termination.other_reason_notes
          .label,
      value: TerminationData.other_reason_notes,
    },
    {
      label:
        staffingTransaction.transactionDetails.termination.rehire_flag.label,
      value: TerminationData.rehire_flag ? "Yes" : "No",
    },
    {
      label:
        staffingTransaction.transactionDetails.termination
          .notes_for_rehire_selection.label,
      value: TerminationData.notes_for_rehire_selection,
    },
    {
      label:
        staffingTransaction.transactionDetails.termination.additional_notes
          .label,
      value: TerminationData.additional_notes,
    },
    {
      label:
        staffingTransaction.transactionDetails.termination.employment_status
          .label,
      value: employmentStatus?.name,
    },
    {
      label: staffingTransaction.transactionDetails.termination.roe_code.label,
      value: TerminationData.roe_code,
    },
    {
      label:
        staffingTransaction.transactionDetails.termination.code_description
          .label,
      value: TerminationData.code_description,
    },
    {
      label:
        staffingTransaction.transactionDetails.termination.explanation.label,
      value: TerminationData.explanation,
    },
  ] as DataSummaryType[];
};

const createLeaveAbsenceSelector = createSelector(
  (state: RootState) =>
    state.staffingTransaction.transactionDetails as TerminationState,
  (state: RootState) => state.staffingTransaction.transactionPurposePage,
  (state: RootState) => state.employment,
  (transactionDetails, transactionPurposePage, employment) => {
    return {
      transactionDetails,
      transactionPurposePage,
      employment,
    };
  },
);

export default function TerminationSummary({
  staffingTransaction,
}: Readonly<StaffingTransactionProps>) {
  const router = useRouter();
  const { transactionDetails, transactionPurposePage, employment } =
    useAppSelector(createLeaveAbsenceSelector);

  const [data, setData] = useState<DataSummaryType[]>([]);
  const { data: dataEmploymentStatus } = useGetFilterQuery("employment_status");
  const [createTermination] = useCreateTerminationMutation();

  const handleSubmitToSave = async () => {
    try {
      if (employment.employment?.personId)
        await createTermination({
          ...transactionDetails,
          person_id: employment.employment?.personId,
          employment_detail_id: transactionPurposePage.employmentDetailId,
          effective_date: transactionPurposePage.effectiveDate,
        }).unwrap();

      enqueueSuccessSnackbar(
        staffingTransaction.transactionDetails.termination.success,
      );
      router.refresh();
    } catch (error) {
      enqueueErrorsSnackbar(
        staffingTransaction.transactionDetails.termination.failed,
      );
    }
  };

  useEffect(() => {
    setData(
      getSummaryData(
        transactionDetails,
        dataEmploymentStatus,
        staffingTransaction,
      ),
    );
  }, [transactionDetails, dataEmploymentStatus, staffingTransaction]);

  return (
    <>
      <DataSummary data={data} title={staffingTransaction.summary.title} />
      <ApprovalUser />
      <BackSubmitButtons
        handleSubmitToSave={handleSubmitToSave}
        buttonLabels={staffingTransaction.button}
      />
    </>
  );
}
