"use client";
import { SecondPageDictionnary } from "@/dictionaries/dictionaries";
import { Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { SecondPageType } from "../secondPage";
import { Control, FieldErrors } from "react-hook-form";
import { SelectFormControl } from "@/app/component/createNewProfile/SelectFormControl";

type Props = {
  binaryGender: SecondPageDictionnary["section"]["binaryGender"];
  control: Control<SecondPageType>;
  errors: FieldErrors<SecondPageType>;
  data: [];
};

export const BinaryGender: FC<Props> = ({
  binaryGender,
  control,
  errors,
  data,
}) => {
  return (
    <Stack gap={3}>
      <Typography variant="h6">{binaryGender.label}</Typography>
      <SelectFormControl
        control={control}
        errors={errors.binaryGender}
        name="binaryGender"
        values={data}
        inputLabel={binaryGender.binaryGender}
        tableName="ref_gender"
        required
      />
    </Stack>
  );
};
