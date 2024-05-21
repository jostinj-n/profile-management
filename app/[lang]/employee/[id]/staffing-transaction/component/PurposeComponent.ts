import LeaveAbsenceForm from "@/app/component/staffingTransaction/leaveAbsence/LeaveAbsenceForm";
import LeaveAbsenceSummary from "@/app/component/staffingTransaction/leaveAbsence/LeaveAbsenceSummary";
import { leaveAbsenceInitialValue } from "@/app/component/staffingTransaction/leaveAbsence/LeaveAbsenceType";

import OtherForm from "@/app/component/staffingTransaction/other/OtherForm";
import OtherSummary from "@/app/component/staffingTransaction/other/OtherSummary";

import { otherInitialValue } from "@/app/component/staffingTransaction/other/OtherType";

import ParkingChangeSummary from "@/app/component/staffingTransaction/parkingChange/ParkingChangeSummary";
import { parkingChangeInitialValue } from "@/app/component/staffingTransaction/parkingChange/ParkingChangeType";
import ParkingChangeDetails from "@/app/component/staffingTransaction/parkingChange/parkingChangeDetails";

import ResignationForm from "@/app/component/staffingTransaction/resignation/ResignationForm";
import ResignationSummary from "@/app/component/staffingTransaction/resignation/ResignationSummary";
import { resignationInitialValue } from "@/app/component/staffingTransaction/resignation/ResignationType";
import TerminationForm from "@/app/component/staffingTransaction/termination/TerminationForm";
import TerminationSummary from "@/app/component/staffingTransaction/termination/TerminationSummary";
import { TerminationInitialValue } from "@/app/component/staffingTransaction/termination/TerminationType";
import { classificationInitValue } from "@/app/component/staffingTransaction/classificationChange/ClassificationChangeType";
import { ClassificationChangeForm } from "@/app/component/staffingTransaction/classificationChange/ClassificationChangeForm";
import { ClassificationChangeSummary } from "@/app/component/staffingTransaction/classificationChange/ClassificationChangeSummary";
import { StaffingTransactionPurpose } from "@/app/[lang]/employee/[id]/staffing-transaction/component/TransactionPurposeType";

import { FC } from "react";
import { Dictionary } from "@/dictionaries/dictionaries";
import { returnToWorkInitValue } from "@/app/component/staffingTransaction/returnToWork/ReturnToWorkType";
import { ReturnToWorkForm } from "@/app/component/staffingTransaction/returnToWork/ReturnToWorkForm";
import { ReturnToWorkSummary } from "@/app/component/staffingTransaction/returnToWork/ReturnToWorkSummary";
import { SalaryRevisionForm } from "@/app/component/staffingTransaction/salaryRevision/SalaryRevisionForm";
import { SalaryRevisionSummary } from "@/app/component/staffingTransaction/salaryRevision/SalaryRevisionSummary";
import { salaryRevisionInitValue } from "@/app/component/staffingTransaction/salaryRevision/SalaryRevisionType";
import { demotionInitValue } from "@/app/component/staffingTransaction/demotion/DemotionType";
import { DemotionForm } from "@/app/component/staffingTransaction/demotion/DemotionForm";
import { DemotionSummary } from "@/app/component/staffingTransaction/demotion/DemotionSummary";
import { promotionInitValue } from "@/app/component/staffingTransaction/promotion/PromotionType";
import { PromotionForm } from "@/app/component/staffingTransaction/promotion/PromotionForm";
import { PromotionSummary } from "@/app/component/staffingTransaction/promotion/PromotionSummary";
import { transferInitValue } from "@/app/component/staffingTransaction/transfer/TransferType";
import { TransferForm } from "@/app/component/staffingTransaction/transfer/TransferForm";
import { TransferSummary } from "@/app/component/staffingTransaction/transfer/TransferSummary";
import { TransactionDetails } from "@/app/redux/features/staffing-transaction/stfSlice";

export type StaffingTransactionProps = {
  staffingTransaction: Dictionary["workforce"]["staffingTransaction"];
};

type StaffingPurposeMap = {
  [k in StaffingTransactionPurpose]: {
    initialValue: TransactionDetails;
    form: FC<StaffingTransactionProps>;
    summary: FC<StaffingTransactionProps>;
  };
};

export const purposeMap: StaffingPurposeMap = {
  "Parking Change": {
    initialValue: parkingChangeInitialValue,
    form: ParkingChangeDetails,
    summary: ParkingChangeSummary,
  },
  "Return to Work": {
    initialValue: returnToWorkInitValue,
    form: ReturnToWorkForm,
    summary: ReturnToWorkSummary,
  },
  "Salary Revision": {
    initialValue: salaryRevisionInitValue,
    form: SalaryRevisionForm,
    summary: SalaryRevisionSummary,
  },
  Demotion: {
    initialValue: demotionInitValue,
    form: DemotionForm,
    summary: DemotionSummary,
  },
  Other: {
    initialValue: otherInitialValue,
    form: OtherForm,
    summary: OtherSummary,
  },
  Promotion: {
    initialValue: promotionInitValue,
    form: PromotionForm,
    summary: PromotionSummary,
  },
  Transfer: {
    initialValue: transferInitValue,
    form: TransferForm,
    summary: TransferSummary,
  },
  "Leave of absence": {
    initialValue: leaveAbsenceInitialValue,
    form: LeaveAbsenceForm,
    summary: LeaveAbsenceSummary,
  },
  Resignation: {
    initialValue: resignationInitialValue,
    form: ResignationForm,
    summary: ResignationSummary,
  },
  Termination: {
    initialValue: TerminationInitialValue,
    form: TerminationForm,
    summary: TerminationSummary,
  },
  "Classification Change": {
    initialValue: classificationInitValue,
    form: ClassificationChangeForm,
    summary: ClassificationChangeSummary,
  },
};
