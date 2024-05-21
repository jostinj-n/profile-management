import { FC } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { back } from "@/app/redux/features/staffing-transaction/stfSlice";
import { useAppDispatch } from "@/app/redux/hooks";
import { StaffingTransactionProps } from "@/app/[lang]/employee/[id]/staffing-transaction/component/PurposeComponent";

export const ReturnToWorkForm: FC<StaffingTransactionProps> = ({
  staffingTransaction,
}) => {
  const dispatch = useAppDispatch();

  return (
    <Stack>
      <Typography>ReturnToWorkForm Not implemented yet</Typography>
      <Button variant="text" onClick={() => dispatch(back())} color="secondary">
        {staffingTransaction.button.back}
      </Button>
    </Stack>
  );
};
