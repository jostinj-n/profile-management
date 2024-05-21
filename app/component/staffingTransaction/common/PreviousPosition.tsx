import { FC } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { PreviousEmploymentDetail } from "@/app/redux/features/staffing-transaction/employmentDetailsApi";
import { Dictionary } from "@/dictionaries/dictionaries";

type Props = {
  staffingTransaction: Dictionary["workforce"]["staffingTransaction"];
  previousEmployment: PreviousEmploymentDetail;
};

export const PreviousPosition: FC<Props> = ({
  staffingTransaction,
  previousEmployment,
}) => {
  const labels = staffingTransaction.transactionDetails.classificationChange;
  const mainFormLabel =
    staffingTransaction.transactionDetails.mainPromotionDemotionTransfer;
  return (
    <Stack>
      <Typography variant={"subtitle1"} paddingY={2}>
        {labels.currentPosition}
      </Typography>
      <Box bgcolor={"#FBFBFA"}>
        <Box display={"grid"} gridTemplateColumns={"1fr 1fr"} padding={2}>
          <Typography variant={"subtitle2"}>
            {mainFormLabel.newCompany.label}
          </Typography>
          <Typography>{previousEmployment.company}</Typography>

          <Typography variant={"subtitle2"}>
            {mainFormLabel.newDepartment.label}
          </Typography>
          <Typography>{previousEmployment.department}</Typography>

          <Typography variant={"subtitle2"}>
            {mainFormLabel.newDivision.label}
          </Typography>
          <Typography>{previousEmployment.division}</Typography>

          <Typography variant={"subtitle2"}>{"Work Location Code"}</Typography>
          <Typography>{previousEmployment.workLocationCode}</Typography>

          <Typography variant={"subtitle2"}>{"Work Location Name"}</Typography>
          <Typography>{previousEmployment.workLocationName}</Typography>

          <Typography variant={"subtitle2"}>{"Organizational Role"}</Typography>
          <Typography>{previousEmployment.organisationalRole}</Typography>

          <Typography variant={"subtitle2"}>
            {"Orgnazational Role Subtype"}
          </Typography>
          <Typography>
            {previousEmployment.organisationalRoleSubtype}
          </Typography>

          <Typography variant={"subtitle2"}>{"Job Title"}</Typography>
          <Typography>{previousEmployment.jobTitle}</Typography>

          <Typography variant={"subtitle2"}>{"Job Level"}</Typography>
          <Typography>{previousEmployment.jobLevel}</Typography>

          <Typography variant={"subtitle2"}>
            {"Status Classification"}
          </Typography>
          <Typography>{previousEmployment.employmentClassification}</Typography>

          <Typography variant={"subtitle2"}>{"Employment Status"}</Typography>
          <Typography>{previousEmployment.employmentStatus}</Typography>
        </Box>
      </Box>
    </Stack>
  );
};
