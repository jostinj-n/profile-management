import React, { FC } from "react";
import { Stack, Typography } from "@mui/material";
import { ninthPageDictionnary } from "@/dictionaries/dictionaries";
import { Control, FieldErrors } from "react-hook-form";
import { NinthPageType } from "../ninthPage";
import { DatePickerComponent } from "@/app/component/createNewProfile/DatePicker";
import { TextFieldComponent } from "@/app/component/createNewProfile/TextFieldComponent";

type Props = {
  costDetails: ninthPageDictionnary["section"]["costDetails"];
  control: Control<NinthPageType>;
  errors: FieldErrors<NinthPageType>;
};

export const CostDetails: FC<Props> = ({ costDetails, control, errors }) => {
  return (
    <Stack gap={3}>
      <Typography variant="h6">{costDetails.label}</Typography>
      <Stack gap={3} direction={"row"}>
        <Stack gap={3}>
          <TextFieldComponent
            control={control}
            type="number"
            name="monthlyRateWithTaxes"
            label={costDetails.monthlyRateWithTaxes}
            placeholder="% 00.00"
            onChange={(event) => parseInt(event.target.value)}
            errors={errors.monthlyRateWithTaxes}
          />
          <DatePickerComponent
            control={control}
            label={costDetails.effectiveFrom}
            name="effectiveFrom"
          />
        </Stack>
        <Stack justifyContent={"flex-end"}>
          <DatePickerComponent
            control={control}
            label={costDetails.effectiveTo}
            name="effectiveTo"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
