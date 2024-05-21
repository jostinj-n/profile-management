"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { Box, Stack } from "@mui/material";
import React, { useEffect } from "react";

import { Dictionary } from "@/dictionaries/dictionaries";
import TransactionPurpose from "./TransactionPurpose";
import TransactionForm from "./TransactionForm";
import TransactionSummary from "./TransactionSummary";
import { RootState } from "@/app/redux/store";
import { fetchEmploymentDetails } from "@/app/redux/features/employmentSlice";
import { initialise } from "@/app/redux/features/staffing-transaction/stfSlice";

type Props = {
  id: string;
  staffingTransaction: Dictionary["workforce"]["staffingTransaction"];
};

export default function StaffingTransaction({
  id,
  staffingTransaction,
}: Readonly<Props>) {
  const activeSteps = useAppSelector(
    (state) => state.staffingTransaction.activeSteps,
  );
  const dispatch = useAppDispatch();
  const { employment } = useAppSelector((state: RootState) => state.employment);

  useEffect(() => {
    dispatch(fetchEmploymentDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(initialise());
  }, [dispatch]);

  return (
    <Stack gap={10} direction="row">
      <Box>
        {activeSteps === 0 && (
          <TransactionPurpose
            staffingTransaction={staffingTransaction}
            employment={employment}
          />
        )}
        {activeSteps === 1 && (
          <TransactionForm
            staffingTransaction={staffingTransaction}
            employment={employment}
          />
        )}
        {activeSteps === 2 && (
          <TransactionSummary staffingTransaction={staffingTransaction} />
        )}
      </Box>
    </Stack>
  );
}
