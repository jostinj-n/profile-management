import React, { FC } from "react";
import { InputAdornment, Stack, Typography } from "@mui/material";
import { ninthPageDictionnary } from "@/dictionaries/dictionaries";
import { Control, FieldErrors } from "react-hook-form";
import { NinthPageType } from "../ninthPage";
import { SelectFormControl } from "@/app/component/createNewProfile/SelectFormControl";
import { TextFieldComponent } from "@/app/component/createNewProfile/TextFieldComponent";

type Props = {
  parkingDetails: ninthPageDictionnary["section"]["parkingDetails"];
  control: Control<NinthPageType>;
  errors: FieldErrors<NinthPageType>;
  data: [];
};

export const ParkingDetails: FC<Props> = ({
  parkingDetails,
  control,
  errors,
  data,
}) => {
  return (
    <Stack gap={3}>
      <Typography variant="h6">{parkingDetails.label}</Typography>
      <Stack gap={3}>
        <Stack direction={"row"} gap={3}>
          <SelectFormControl
            control={control}
            errors={errors.issuedPassType}
            name="issuedPassType"
            values={data}
            inputLabel={parkingDetails.issuedPassType}
            tableName="ref_parking_pass_type"
          />
          <TextFieldComponent
            control={control}
            name="passNumber"
            label={parkingDetails.passNumber}
            errors={errors.passNumber}
          />
        </Stack>
        <Stack gap={3} direction={"row"}>
          <Stack gap={3}>
            <SelectFormControl
              control={control}
              errors={errors.reimbursementType}
              name="reimbursementType"
              values={data}
              inputLabel={parkingDetails.reimbursementType}
              tableName="ref_reimbursement_type"
            />
            <TextFieldComponent
              control={control}
              type="number"
              name="reimbursementAmount"
              label={parkingDetails.reimbursementAmount}
              errors={errors.reimbursementAmount}
              onChange={(event) => parseInt(event.target.value)}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
            <SelectFormControl
              control={control}
              errors={errors.issuingAgency}
              name="issuingAgency"
              values={data}
              inputLabel={parkingDetails.issuingAgency}
              tableName="ref_parking_issuing_agency"
            />
          </Stack>
          <Stack justifyContent={"center"}>
            <TextFieldComponent
              control={control}
              type="number"
              name="reimbursementPercentage"
              label={parkingDetails.reimbursementTPercentage}
              onChange={(event) => parseInt(event.target.value)}
              errors={errors.reimbursementPercentage}
              startAdornment={
                <InputAdornment position="start">%</InputAdornment>
              }
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
