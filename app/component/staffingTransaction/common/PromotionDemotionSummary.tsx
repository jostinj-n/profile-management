import { FC } from "react";
import { createSelector } from "reselect";
import { RootState } from "@/app/redux/store";
import { useAppSelector } from "@/app/redux/hooks";
import DataSummary, {
  DataSummaryType,
} from "@/app/component/staffingTransaction/DataSummary";
import ApprovalUser from "@/app/component/staffingTransaction/ApprovalUser";
import BackSubmitButtons from "@/app/component/staffingTransaction/BackSubmitButtons";
import { Dictionary } from "@/dictionaries/dictionaries";
import { MainState } from "./PromoDemoTransType";

type Props = {
  staffingTransaction: Dictionary["workforce"]["staffingTransaction"];
  handleSubmitToSave: () => Promise<void>;
  isLoading: boolean;
};

const promotionSummarySelector = (
  staffingTransaction: Dictionary["workforce"]["staffingTransaction"]
) =>
  createSelector(
    (state: RootState) => state.staffingTransaction.transactionDetails,
    (state: RootState) =>
      state.staffingTransaction.transactionPurposePage.purpose,
    (transactionDetails, purpose): DataSummaryType[] => {
      let result: DataSummaryType[] = [];
      if (!transactionDetails) {
        return result;
      }
      const { mainPromotionDemotionTransfer: mainLabel } =
        staffingTransaction.transactionDetails;
      const transactionDetailsState = transactionDetails as MainState;

      result = [
        {
          label: mainLabel.firstDayWorkedInRole.label,
          value: transactionDetailsState.firstDayWorkedInRole,
        },
        {
          label: mainLabel.lastDayWorkedInRole.label,
          value: transactionDetailsState.lastDayWorkedInRole,
        },
        {
          label: mainLabel.newCompany.label,
          value: transactionDetailsState.newCompany,
        },
        {
          label: mainLabel.newDepartment.label,
          value: transactionDetailsState.newDepartment,
        },
        {
          label: mainLabel.newWorkLocationCode.label,
          value: transactionDetailsState.newWorkLocationCode,
        },
        {
          label: mainLabel.newWorkLocationName.label,
          value: transactionDetailsState.newWorkLocationName,
        },
        {
          label: mainLabel.newOrganizationalRole.label,
          value: transactionDetailsState.newOrganizationalRole,
        },
        {
          label: mainLabel.newOrganizationalRoleSubtype.label,
          value: transactionDetailsState.newOrganizationalRoleSubtype,
        },
        {
          label: mainLabel.newJobTitle.label,
          value: transactionDetailsState.newJobTitle,
        },
        {
          label: mainLabel.newCatsaJobLevel.label,
          value: transactionDetailsState.newCatsaJobLevel,
        },
        {
          label: mainLabel.newEmploymentClassification.label,
          value: transactionDetailsState.newEmploymentClassification,
        },
        {
          label: mainLabel.employmentStatus.label,
          value: transactionDetailsState.employmentStatus,
        },
      ];
      if (purpose === "Transfer")
        result.splice(0, 0, {
          label:
            staffingTransaction.transactionDetails.transfer.transferType.label,
          value: transactionDetailsState.transferType ?? "",
        });
      return result;
    }
  );

export const PromotionDemotionSummary: FC<Props> = ({
  staffingTransaction,
  handleSubmitToSave,
  isLoading,
}) => {
  const summaryData = useAppSelector(
    promotionSummarySelector(staffingTransaction)
  );

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
