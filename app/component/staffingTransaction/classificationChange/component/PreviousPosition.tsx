import { FC } from "react";
import { Dictionary } from "@/dictionaries/dictionaries";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useAppSelector } from "@/app/redux/hooks";
import { useGetEmploymentDetailsQuery } from "@/app/redux/features/staffing-transaction/employmentDetailsApi";
import { RootState } from "@/app/redux/store";

const selectEmploymentId = (state: RootState) =>
  state.staffingTransaction.transactionPurposePage.employmentDetailId;

type Props = {
  labels: Dictionary["workforce"]["staffingTransaction"]["transactionDetails"]["classificationChange"];
};

export const PreviousPosition: FC<Props> = ({ labels }) => {
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
    <Stack>
      <Typography variant={"subtitle1"}>{labels.currentPosition}</Typography>
      <Box bgcolor={"#FBFBFA"} p={3}>
        <Box display={"grid"} gridTemplateColumns={"1fr 1fr"}>
          <Typography variant={"subtitle2"}>
            {labels.department.label}
          </Typography>
          <Typography>{previousEmployment.department}</Typography>
          <Typography variant={"subtitle2"}>
            {labels.vacationEntitlementDate.label}
          </Typography>
          <Typography>{previousEmployment.vacationEntitlementDate}</Typography>
          <Typography variant={"subtitle2"}>{labels.jobLevel.label}</Typography>
          <Typography>{previousEmployment.jobLevel}</Typography>
          <Typography variant={"subtitle2"}>
            {labels.employmentStatus.label}
          </Typography>
          <Typography>{previousEmployment.employmentStatus}</Typography>
          <Typography variant={"subtitle2"}>
            {labels.statusClassification.label}
          </Typography>
          <Typography>{previousEmployment.employmentClassification}</Typography>
        </Box>
      </Box>
    </Stack>
  );
};
