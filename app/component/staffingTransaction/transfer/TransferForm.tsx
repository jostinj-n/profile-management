import { FC } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { StaffingTransactionProps } from "@/app/[lang]/employee/[id]/staffing-transaction/component/PurposeComponent";
import { Line } from "../../Line";
import { PreviousPosition } from "../common/PreviousPosition";
import Form from "../common/Form";
import { useGetEmploymentDetailsQuery } from "@/app/redux/features/staffing-transaction/employmentDetailsApi";
import { useAppSelector } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";

const selectEmploymentId = (state: RootState) =>
  state.staffingTransaction.transactionPurposePage.employmentDetailId;

export const TransferForm: FC<StaffingTransactionProps> = ({
  staffingTransaction,
}) => {
  const employmentId = useAppSelector(selectEmploymentId);
  const {
    data: previousEmployment,
    isLoading,
    error,
  } = useGetEmploymentDetailsQuery(employmentId);
  if (!previousEmployment || isLoading || error) {
    return <CircularProgress />;
  }
  return (
    <Line gap={4}>
      <Box>
        <Typography variant={"subtitle1"} paddingY={2}>
          {staffingTransaction.transactionDetails.transfer.title}
        </Typography>
        <Form
          staffingTransaction={staffingTransaction}
          previousEmployment={previousEmployment}
        />
      </Box>
      <PreviousPosition
        staffingTransaction={staffingTransaction}
        previousEmployment={previousEmployment}
      />
    </Line>
  );
};
