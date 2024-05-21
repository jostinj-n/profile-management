"use client";
import { Dictionary } from "@/dictionaries/dictionaries";
import { Stack, TextField, Typography } from "@mui/material";
import React, { FC } from "react";
import { SecondPageType } from "../secondPage";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { SelectFormControl } from "@/app/component/createNewProfile/SelectFormControl";
import { DatePickerComponent } from "@/app/component/createNewProfile/DatePicker";
import { TextFieldComponent } from "@/app/component/createNewProfile/TextFieldComponent";
import { Option } from "@/app/[lang]/workforce/profile-update/types/referenceData";

type Props = {
  taxID: Dictionary["workforce"]["newProfile"]["secondPage"]["section"]["taxID"];
  control: Control<SecondPageType>;
  errors: FieldErrors<SecondPageType>;
  data: Option[];
};

export const TaxID: FC<Props> = ({ taxID, control, errors, data }) => {
  return (
    <Stack gap={3}>
      <Typography variant="h6">{taxID.label}</Typography>
      <Stack gap={3}>
        <Stack direction={"row"} gap={3}>
          <SelectFormControl
            control={control}
            errors={errors.taxIdType}
            name={`taxIdType`}
            values={data}
            inputLabel={taxID.taxIdType}
            tableName="ref_id_type"
            required
          />
          <Stack direction={"row"}>
            <TextFieldComponent
              control={control}
              name="taxIdValue"
              label={taxID.taxIdValue}
              errors={errors.taxIdValue}
              required
            />
          </Stack>
        </Stack>
        <Stack direction={"row"} gap={3}>
          <SelectFormControl
            control={control}
            errors={errors.taxIssuingAgency}
            name={`taxIssuingAgency`}
            values={data}
            inputLabel={taxID.taxIssuing}
            tableName="ref_id_issuing_agency"
            required
          />
          <DatePickerComponent
            control={control}
            label={taxID.expiryDateTax}
            name={`expiryDateTax`}
          />
        </Stack>
      </Stack>
      <Stack width={"300px"}>
        <Controller
          control={control}
          name="notes"
          render={({ field }) => (
            <TextField
              rows={4}
              multiline
              label={taxID.notes}
              placeholder={taxID.notes}
              helperText={errors.notes?.message}
              inputRef={field.ref}
              error={!!errors.notes}
              {...field}
            />
          )}
        />
      </Stack>
    </Stack>
  );
};
