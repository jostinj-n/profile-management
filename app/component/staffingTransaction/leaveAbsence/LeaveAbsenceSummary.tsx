import { useAppSelector } from "@/app/redux/hooks";

import { LeaveAbsenceState } from "./LeaveAbsenceType";
import ApprovalUser from "../ApprovalUser";
import BackSubmitButtons from "../BackSubmitButtons";
import DataSummary, { DataSummaryType } from "../DataSummary";
import { useEffect, useState } from "react";
import { Dictionary } from "@/dictionaries/dictionaries";
import { useGetFilterQuery } from "@/app/redux/features/seniority/filtersApi";
import { FilterResponse } from "@/app/api/seniority/filters/[name]/route";
import { useCreateLeaveAbsenceMutation } from "@/app/redux/features/staffing-transaction/leaveAbsenceApi";
import { createSelector } from "reselect";
import { RootState } from "@/app/redux/store";

import { StaffingTransactionProps } from "@/app/[lang]/employee/[id]/staffing-transaction/component/PurposeComponent";
import {
  enqueueErrorsSnackbar,
  enqueueSuccessSnackbar,
} from "@/app/[lang]/workforce/profile-update/util/notistack";

const getSummaryData = (
  leaveAbsenceData: LeaveAbsenceState,
  dataEmploymentStatus: FilterResponse[] | undefined,
  staffingTransaction: Dictionary["workforce"]["staffingTransaction"],
): DataSummaryType[] => {
  const employmentStatus = dataEmploymentStatus?.find(
    (item) => item.id == leaveAbsenceData.employment_status,
  );
  return [
    {
      label: staffingTransaction.transactionDetails.leaveAbsence.loa_type.label,
      value: leaveAbsenceData.loa_type,
    },
    {
      label:
        staffingTransaction.transactionDetails.leaveAbsence.date_from.label,
      value: leaveAbsenceData.date_from,
    },
    {
      label: staffingTransaction.transactionDetails.leaveAbsence.date_to.label,
      value: leaveAbsenceData.date_to,
    },
    {
      label:
        staffingTransaction.transactionDetails.leaveAbsence
          .date_expected_return_to_work.label,
      value: leaveAbsenceData.date_expected_return_to_work,
    },
    {
      label: staffingTransaction.transactionDetails.leaveAbsence.notes.label,
      value: leaveAbsenceData.notes,
    },
    {
      label:
        staffingTransaction.transactionDetails.leaveAbsence.employment_status
          .label,
      value: employmentStatus?.name,
    },
    {
      label: staffingTransaction.transactionDetails.leaveAbsence.roe_code.label,
      value: leaveAbsenceData.roe_code,
    },
    {
      label:
        staffingTransaction.transactionDetails.leaveAbsence.code_description
          .label,
      value: leaveAbsenceData.code_description,
    },
    {
      label:
        staffingTransaction.transactionDetails.leaveAbsence.explanation.label,
      value: leaveAbsenceData.explanation,
    },
  ] as DataSummaryType[];
};

const createLeaveAbsenceSelector = createSelector(
  (state: RootState) =>
    state.staffingTransaction.transactionDetails as LeaveAbsenceState,
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

export default function LeaveAbsenceSummary({
  staffingTransaction,
}: Readonly<StaffingTransactionProps>) {
  const { transactionDetails, transactionPurposePage, employment } =
    useAppSelector(createLeaveAbsenceSelector);

  const [data, setData] = useState<DataSummaryType[]>([]);
  const { data: dataEmploymentStatus } = useGetFilterQuery("employment_status");
  const [createLeaveAbsence] = useCreateLeaveAbsenceMutation();

  const handleSubmitToSave = async () => {
    try {
      if (employment.employment?.personId)
        await createLeaveAbsence({
          ...transactionDetails,
          person_id: employment.employment?.personId,
          employment_detail_id: transactionPurposePage.employmentDetailId,
          effective_date: transactionPurposePage.effectiveDate,
        }).unwrap();

      enqueueSuccessSnackbar(
        staffingTransaction.transactionDetails.leaveAbsence.success,
      );
    } catch (error) {
      enqueueErrorsSnackbar(
        staffingTransaction.transactionDetails.leaveAbsence.failed,
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
