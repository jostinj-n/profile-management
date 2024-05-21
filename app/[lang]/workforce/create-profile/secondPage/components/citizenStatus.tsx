"use client";
import { Dictionary } from "@/dictionaries/dictionaries";
import { Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { SecondPageType } from "../secondPage";
import { Control, FieldErrors } from "react-hook-form";
import { TextFieldComponent } from "@/app/component/createNewProfile/TextFieldComponent";
import { SelectFormControl } from "@/app/component/createNewProfile/SelectFormControl";
import { DatePickerComponent } from "@/app/component/createNewProfile/DatePicker";
import { Option } from "@/app/[lang]/workforce/profile-update/types/referenceData";

type Props = {
  citizenDetails: Dictionary["workforce"]["newProfile"]["secondPage"]["section"]["citizenStatus"];
  control: Control<SecondPageType>;
  errors: FieldErrors<SecondPageType>;
  data: Option[];
};

export const CitizenStatus: FC<Props> = ({
  citizenDetails,
  control,
  errors,
  data,
}) => {
  return (
    <Stack gap={3}>
      <Typography variant="h6">{citizenDetails.label}</Typography>
      <Stack direction={"row"} gap={3}>
        <Stack gap={3}>
          <SelectFormControl
            control={control}
            errors={errors.citizenCountry}
            name="citizenCountry"
            values={data}
            inputLabel={citizenDetails.citizenCountry}
            tableName="ref_country"
            required
          />
          <SelectFormControl
            control={control}
            errors={errors.citizenIssuingAgency}
            name="citizenIssuingAgency"
            values={data}
            inputLabel={citizenDetails.issuing}
            tableName="ref_id_issuing_agency"
          />
          <SelectFormControl
            control={control}
            errors={errors.statusIdType}
            name="statusIdType"
            values={data}
            inputLabel={citizenDetails.statusIdType}
            tableName="ref_id_type"
            required
          />
          <DatePickerComponent
            control={control}
            label={citizenDetails.effectiveFrom}
            name="effectiveFrom"
          />
        </Stack>
        <Stack gap={3} justifyContent={"space-between"}>
          <Stack gap={3}>
            <SelectFormControl
              control={control}
              errors={errors.status}
              name="status"
              values={data}
              inputLabel={citizenDetails.status}
              tableName="ref_citizen_status"
              required
            />
            <TextFieldComponent
              control={control}
              required
              name="idValue"
              label={citizenDetails.idValue}
              errors={errors.idValue}
            />
          </Stack>
          <Stack>
            <DatePickerComponent
              control={control}
              label={citizenDetails.effectiveTo}
              name="effectiveTo"
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
