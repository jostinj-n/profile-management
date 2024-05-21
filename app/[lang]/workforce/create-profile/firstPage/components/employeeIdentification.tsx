"use client";

import { FirstPageDictionary } from "@/dictionaries/dictionaries";
import { Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { Control, FieldErrors } from "react-hook-form";
import { FirstPageType } from "@/app/[lang]/workforce/create-profile/firstPage/firstPage";
import { TextFieldComponent } from "@/app/component/createNewProfile/TextFieldComponent";
import { SelectFormControl } from "@/app/component/createNewProfile/SelectFormControl";
import { DatePickerComponent } from "@/app/component/createNewProfile/DatePicker";

type Props = {
  employeeIdentification: FirstPageDictionary["section"]["employeeIdentification"];
  control: Control<FirstPageType>;
  errors: FieldErrors<FirstPageType>;
  data: [];
};

export const EmployeeIdentification: FC<Props> = ({
  employeeIdentification,
  control,
  errors,
  data,
}) => {
  return (
    <Stack gap={2}>
      <Typography variant="h6">{employeeIdentification.label}</Typography>
      <Stack gap={3}>
        <TextFieldComponent
          control={control}
          name="employeeNumber"
          label={employeeIdentification.employeeNumber}
          errors={errors.employeeNumber}
          required
        />
        <Stack direction={"row"} gap={3}>
          <SelectFormControl
            control={control}
            errors={errors.ressourceType}
            name="ressourceType"
            values={data}
            tableName="ref_resource_type"
            inputLabel={employeeIdentification.ressourceType}
            required
          />
          <DatePickerComponent
            disablePast
            control={control}
            label={employeeIdentification.effectiveDate}
            name="effectiveDate"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
