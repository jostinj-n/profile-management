"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import React, { useEffect } from "react";

import { Dictionary } from "@/dictionaries/dictionaries";

import { initialise } from "@/app/redux/features/staffing-transaction/stfSlice";

type Props = {
  staffingTransaction: Dictionary["workforce"]["staffingTransaction"];
};

export default function StaffingTransactionStepper({
  staffingTransaction,
}: Readonly<Props>) {
  const activeSteps = useAppSelector(
    (state) => state.staffingTransaction.activeSteps,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initialise());
  }, [dispatch]);

  return (
    <Box paddingLeft={3} paddingTop={3}>
      <Stepper activeStep={activeSteps} orientation="vertical">
        {staffingTransaction.activeStepLabel.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
