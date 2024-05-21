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
import { ResignationState } from "./ResignationType";
import { useCreateResignationMutation } from "@/app/redux/features/staffing-transaction/resignationApi";
import {
  enqueueErrorsSnackbar,
  enqueueSuccessSnackbar,
} from "@/app/[lang]/workforce/profile-update/util/notistack";

const getSummaryData = (
  resignationData: ResignationState,
  dataEmploymentStatus: FilterResponse[] | undefined,
  staffingTransaction: Dictionary["workforce"]["staffingTransaction"],
): DataSummaryType[] => {
  const employmentStatus = dataEmploymentStatus?.find(
    (item) => item.id == resignationData.employment_status,
  );
  return [
    {
      label:
        staffingTransaction.transactionDetails.resignation.last_day_work_in_role
          .label,
      value: resignationData.last_day_work_in_role,
    },
    {
      label: staffingTransaction.transactionDetails.resignation.reason.label,
      value: resignationData.reason,
    },
    {
      label:
        staffingTransaction.transactionDetails.resignation.other_reason_notes
          .label,
      value: resignationData.other_reason_notes,
    },
    {
      label:
        staffingTransaction.transactionDetails.resignation.rehire_flag.label,
      value: resignationData.rehire_flag ? "Yes" : "No",
    },
    {
      label:
        staffingTransaction.transactionDetails.resignation
          .notes_for_rehire_selection.label,
      value: resignationData.notes_for_rehire_selection,
    },
    {
      label:
        staffingTransaction.transactionDetails.resignation.additional_notes
          .label,
      value: resignationData.additional_notes,
    },
    {
      label:
        staffingTransaction.transactionDetails.resignation.employment_status
          .label,
      value: employmentStatus?.name,
    },
    {
      label: staffingTransaction.transactionDetails.resignation.roe_code.label,
      value: resignationData.roe_code,
    },
    {
      label:
        staffingTransaction.transactionDetails.resignation.code_description
          .label,
      value: resignationData.code_description,
    },
    {
      label:
        staffingTransaction.transactionDetails.resignation.explanation.label,
      value: resignationData.explanation,
    },
  ] as DataSummaryType[];
};

const createLeaveAbsenceSelector = createSelector(
  (state: RootState) =>
    state.staffingTransaction.transactionDetails as ResignationState,
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

type Props = {
  staffingTransaction: Dictionary["workforce"]["staffingTransaction"];
};
export default function ResignationSummary({
  staffingTransaction,
}: Readonly<Props>) {
  const router = useRouter();
  const { transactionDetails, transactionPurposePage, employment } =
    useAppSelector(createLeaveAbsenceSelector);

  const [data, setData] = useState<DataSummaryType[]>([]);
  const { data: dataEmploymentStatus } = useGetFilterQuery("employment_status");
  const [createResignation] = useCreateResignationMutation();

  const handleSubmitToSave = async () => {
    try {
      if (employment.employment?.personId)
        await createResignation({
          ...transactionDetails,
          person_id: employment.employment?.personId,
          employment_detail_id: transactionPurposePage.employmentDetailId,
          effective_date: transactionPurposePage.effectiveDate,
        }).unwrap();

      enqueueSuccessSnackbar(
        staffingTransaction.transactionDetails.resignation.success,
      );
      router.refresh();
    } catch (error) {
      enqueueErrorsSnackbar(
        staffingTransaction.transactionDetails.resignation.failed,
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
