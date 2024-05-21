import { useAppSelector } from "@/app/redux/hooks";

import { ParkingChangeState } from "./ParkingChangeType";
import ApprovalUser from "../ApprovalUser";
import BackSubmitButtons from "../BackSubmitButtons";
import DataSummary, { DataSummaryType } from "../DataSummary";
import { useEffect, useState } from "react";
import { Dictionary } from "@/dictionaries/dictionaries";

import { createSelector } from "reselect";
import { RootState } from "@/app/redux/store";

import { useCreateParkingChangeMutation } from "@/app/redux/features/staffing-transaction/parkingChangeApi";
import {
  enqueueErrorsSnackbar,
  enqueueSuccessSnackbar,
} from "@/app/[lang]/workforce/profile-update/util/notistack";

const getSummaryData = (
  parkingChangeData: ParkingChangeState,
  staffingTransaction: Dictionary["workforce"]["staffingTransaction"],
): DataSummaryType[] => {
  return [
    {
      label:
        staffingTransaction.transactionDetails.parkingChange.parking_pass_type
          .label,
      value: parkingChangeData.parking_pass_type,
    },
    {
      label:
        staffingTransaction.transactionDetails.parkingChange.pass_number.label,
      value: parkingChangeData.pass_number,
    },
    {
      label:
        staffingTransaction.transactionDetails.parkingChange.reimbursement_type
          .label,
      value: parkingChangeData.reimbursement_type,
    },
    {
      label:
        staffingTransaction.transactionDetails.parkingChange.reimbursement_value
          .label,
      value: parkingChangeData.reimbursement_value,
    },
    {
      label:
        staffingTransaction.transactionDetails.parkingChange
          .parking_issuing_agency.label,
      value: parkingChangeData.parking_issuing_agency,
    },
    {
      label:
        staffingTransaction.transactionDetails.parkingChange.pass_monthly_cost
          .label,
      value: parkingChangeData.pass_monthly_cost,
    },
    {
      label:
        staffingTransaction.transactionDetails.parkingChange.effective_from
          .label,
      value: parkingChangeData.effective_from,
    },
    {
      label:
        staffingTransaction.transactionDetails.parkingChange.effective_to.label,
      value: parkingChangeData.effective_to,
    },
    {
      label:
        staffingTransaction.transactionDetails.parkingChange.vehicle_make.label,
      value: parkingChangeData.vehicle_make,
    },
    {
      label:
        staffingTransaction.transactionDetails.parkingChange.vehicle_model
          .label,
      value: parkingChangeData.vehicle_model,
    },
    {
      label:
        staffingTransaction.transactionDetails.parkingChange.vehicle_color
          .label,
      value: parkingChangeData.vehicle_color,
    },
    {
      label:
        staffingTransaction.transactionDetails.parkingChange
          .vehicle_licence_plate.label,
      value: parkingChangeData.vehicle_licence_plate,
    },
    {
      label:
        staffingTransaction.transactionDetails.parkingChange.explanation.label,
      value: parkingChangeData.explanation,
    },
  ] as DataSummaryType[];
};

const createParkingChangeSelector = createSelector(
  (state: RootState) =>
    state.staffingTransaction.transactionDetails as ParkingChangeState,
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
export default function ParkingChangeSummary({
  staffingTransaction,
}: Readonly<Props>) {
  const { transactionDetails, transactionPurposePage, personId } =
    useAppSelector(createParkingChangeSelector);

  const [data, setData] = useState<DataSummaryType[]>([]);
  const [createParkingChange] = useCreateParkingChangeMutation();

  const handleSubmitToSave = async () => {
    try {
      if (personId)
        await createParkingChange({
          ...transactionDetails,
          person_id: personId,
          employment_detail_id: transactionPurposePage.employmentDetailId,
          effective_date: transactionPurposePage.effectiveDate,
        }).unwrap();

      enqueueSuccessSnackbar(
        staffingTransaction.transactionDetails.parkingChange.success,
      );
    } catch (error) {
      enqueueErrorsSnackbar(
        staffingTransaction.transactionDetails.parkingChange.failed,
      );
    }
  };

  useEffect(() => {
    setData(getSummaryData(transactionDetails, staffingTransaction));
  }, [transactionDetails, staffingTransaction]);

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
