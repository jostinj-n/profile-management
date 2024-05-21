import {
  transactionPurposeInitial,
  TransactionPurposeState,
} from "@/app/[lang]/employee/[id]/staffing-transaction/component/TransactionPurposeType";
import { LeaveAbsenceState } from "@/app/component/staffingTransaction/leaveAbsence/LeaveAbsenceType";
import { OtherState } from "@/app/component/staffingTransaction/other/OtherType";
import { ResignationState } from "@/app/component/staffingTransaction/resignation/ResignationType";
import { TerminationState } from "@/app/component/staffingTransaction/termination/TerminationType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClassificationChangeState } from "@/app/component/staffingTransaction/classificationChange/ClassificationChangeType";
import { ParkingChangeState } from "@/app/component/staffingTransaction/parkingChange/ParkingChangeType";
import { ReturnToWorkState } from "@/app/component/staffingTransaction/returnToWork/ReturnToWorkType";
import { SalaryRevisionState } from "@/app/component/staffingTransaction/salaryRevision/SalaryRevisionType";
import { DemotionState } from "@/app/component/staffingTransaction/demotion/DemotionType";
import { PromotionState } from "@/app/component/staffingTransaction/promotion/PromotionType";
import { TransferState } from "@/app/component/staffingTransaction/transfer/TransferType";

import { purposeMap } from "@/app/[lang]/employee/[id]/staffing-transaction/component/PurposeComponent";

type STFState = {
  activeSteps: number;
  purposeOld: string;
  transactionPurposePage: TransactionPurposeState;
  transactionDetails?: TransactionDetails;
};

export type TransactionDetails =
  | LeaveAbsenceState
  | ReturnToWorkState
  | SalaryRevisionState
  | DemotionState
  | OtherState
  | PromotionState
  | TransferState
  | TerminationState
  | ResignationState
  | ClassificationChangeState
  | ParkingChangeState;

const initialState: STFState = {
  activeSteps: 0,
  purposeOld: "",
  transactionPurposePage: transactionPurposeInitial,
};

const stfSlice = createSlice({
  name: "staffingTransactionSlice",
  initialState,
  reducers: {
    goToTransactionDetailsPage(
      state,
      action: PayloadAction<TransactionPurposeState>
    ) {
      state.transactionPurposePage = action.payload;

      if (state.transactionPurposePage.purpose !== state.purposeOld) {
        const { initialValue } = purposeMap[action.payload.purpose];
        state.transactionDetails = {
          ...initialValue,
        };
      }
      state.purposeOld = state.transactionPurposePage.purpose;
      state.activeSteps = state.activeSteps + 1;
    },
    goToSummaryPage(state, action: PayloadAction<TransactionDetails>) {
      state.transactionDetails = action.payload;
      state.activeSteps = state.activeSteps + 1;
    },
    updateTransactionDetails(state, action: PayloadAction<TransactionDetails>) {
      state.transactionDetails = action.payload;
    },
    back(state) {
      state.activeSteps = state.activeSteps - 1;
    },
    initialise(state) {
      state.activeSteps = initialState.activeSteps;
      state.purposeOld = initialState.purposeOld;
      state.transactionPurposePage = initialState.transactionPurposePage;
    },
  },
});

export const {
  goToTransactionDetailsPage,
  goToSummaryPage,
  back,
  initialise,
  updateTransactionDetails,
} = stfSlice.actions;
export default stfSlice.reducer;
