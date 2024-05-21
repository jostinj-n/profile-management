"use client";
import { EighthPageDictionnary } from "@/dictionaries/dictionaries";
import { Stack, TextField } from "@mui/material";
import React, { FC } from "react";
import { Control, Controller, FieldErrors, useWatch } from "react-hook-form";
import { EighthPageType } from "../eighthPage";
import { Dayjs } from "dayjs";
import { TextFieldComponent } from "@/app/component/createNewProfile/TextFieldComponent";
import { DatePickerComponent } from "@/app/component/createNewProfile/DatePicker";

type Props = {
  seniorytyDetails: EighthPageDictionnary["section"]["seniorityDetails"];
  control: Control<EighthPageType>;
  errors: FieldErrors<EighthPageType>;
  dateOfBirth?: Dayjs;
  data: [];
};

export const SeniorityDetails: FC<Props> = ({
  seniorytyDetails,
  control,
  errors,
  dateOfBirth,
}) => {
  const [vacationDate, workLocationStartDate] = useWatch({
    control,
    name: ["vacationEntitlementDate", "workLocationStartDate"],
  });
  return (
    <Stack gap={3}>
      <Stack gap={3} direction={"row"}>
        <Stack gap={3}>
          <DatePickerComponent
            control={control}
            label={seniorytyDetails.vacationDate}
            name="vacationEntitlementDate"
            defaultValue={dateOfBirth}
          />{" "}
          <DatePickerComponent
            control={control}
            label={seniorytyDetails.workLocationDate}
            name="workLocationStartDate"
            defaultValue={vacationDate}
          />{" "}
          <DatePickerComponent
            control={control}
            label={seniorytyDetails.statusClassificationDate}
            name="statusClassificationStartDate"
            defaultValue={workLocationStartDate}
          />
        </Stack>
        <Stack gap={3} justifyContent={"flex-end"}>
          <TextFieldComponent
            control={control}
            type="number"
            name="workLocationTiebreakerValue"
            label={seniorytyDetails.workLocationTiebreaker}
            errors={errors.workLocationTiebreakerValue}
            onChange={(event) => parseInt(event.target.value)}
            required
          />
          <TextFieldComponent
            control={control}
            type="number"
            name="statusClassificationTiebreakerValue"
            label={seniorytyDetails.statusClassificationTiebreakerValue}
            errors={errors.statusClassificationTiebreakerValue}
            onChange={(event) => parseInt(event.target.value)}
            required
          />
        </Stack>
      </Stack>
      <Stack width={"30%"}>
        <Controller
          control={control}
          name={"note"}
          render={({ field }) => (
            <TextField
              rows={4}
              multiline
              label={seniorytyDetails.notes}
              placeholder={seniorytyDetails.notes}
              helperText={errors.note?.message}
              inputRef={field.ref}
              error={!!errors.note}
              {...field}
            />
          )}
        />
      </Stack>
    </Stack>
  );
};
