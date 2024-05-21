import { useAppSelector } from "@/app/redux/hooks";

import React from "react";
import DataSummary, {
  DataSummaryType,
} from "@/app/component/staffingTransaction/DataSummary";
import { StaffingTransactionPurpose } from "./TransactionPurposeType";
import { Employment } from "@/app/types/employment";
import { Dictionary } from "@/dictionaries/dictionaries";
import { Divider, Stack } from "@mui/material";
import {
  purposeMap,
  StaffingTransactionProps,
} from "@/app/[lang]/employee/[id]/staffing-transaction/component/PurposeComponent";
import { createSelector } from "reselect";
import { RootState } from "@/app/redux/store";

const detailComponentSelector = createSelector(
  (state: RootState) =>
    state.staffingTransaction.transactionPurposePage.purpose,
  (purpose: StaffingTransactionPurpose) => purposeMap[purpose].form,
);

const summaryDataSelector = (
  employment: Employment | null,
  staffingTransaction: Dictionary["workforce"]["staffingTransaction"],
) =>
  createSelector(
    (state: RootState) => state.staffingTransaction.transactionPurposePage,
    (transactionPurposePage) => {
      const employmentDetail = employment?.employmentDetails?.find(
        (item) =>
          item.employmentDetailId == transactionPurposePage.employmentDetailId,
      );
      return [
        {
          label: staffingTransaction.summary.purpose,
          value: transactionPurposePage.purpose,
        },
        {
          label: staffingTransaction.summary.effectiveDate,
          value: transactionPurposePage.effectiveDate,
        },
        {
          label: staffingTransaction.summary.employmentRecord,
          value: `${employmentDetail?.employmentStatus}-${employmentDetail?.jobTitle}`,
        },
        {
          label: staffingTransaction.summary.division,
          value: employmentDetail?.divisionName,
        },
        {
          label: staffingTransaction.summary.workLocationName,
          value: employmentDetail?.otherWorkLocations,
        },

        {
          label: staffingTransaction.summary.workLocationCode,
          value: employmentDetail?.primaryWorkLocationCode,
        },
        {
          label: staffingTransaction.summary.statusClassification,
          value: employmentDetail?.statusClassification,
        },
        {
          label: staffingTransaction.summary.employmentStatus,
          value: employmentDetail?.employmentStatus,
        },
      ] as DataSummaryType[];
    },
  );

type Props = StaffingTransactionProps & {
  employment: Employment | null;
};

export default function TransactionForm({
  employment,
  staffingTransaction,
}: Readonly<Props>) {
  const DetailComponent = useAppSelector(detailComponentSelector);
  const data = useAppSelector(
    summaryDataSelector(employment, staffingTransaction),
  );

  return (
    <>
      <Stack paddingBottom={2}>
        <DataSummary data={data} title="" />
      </Stack>
      <Divider />
      <Stack paddingTop={2}>
        <DetailComponent staffingTransaction={staffingTransaction} />
      </Stack>
    </>
  );
}
