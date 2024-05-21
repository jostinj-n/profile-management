import { MenuItem, TextField } from "@mui/material";
import React from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import { Option } from "@/app/[lang]/workforce/profile-update/types/referenceData";

type Form<T extends FieldValues> = {
  control: Control<T>;
  errors?: FieldError;
  values: Option[];
  inputLabel: string;
  required?: boolean;
  startAdornment?: React.ReactNode;
  tableName?: string;
  needTableCode?: boolean;
  size?: "small";
} & UseControllerProps<T>;

export const SelectFormControl = <T extends FieldValues>({
  control,
  errors,
  name,
  values,
  inputLabel,
  required,
  startAdornment,
  tableName,
  size,
  needTableCode,
}: Form<T>) => {
  const filteredData = values.filter((value) => value.table_name === tableName);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          select
          size={size}
          InputProps={{
            startAdornment,
          }}
          required={required}
          label={inputLabel}
          helperText={errors?.message || " "}
          inputRef={field.ref}
          error={!!errors}
          {...field}
          sx={{ width: "300px", minWidth: "300px" }}
        >
          {filteredData.map((filteredValue) => (
            <MenuItem
              key={filteredValue.id}
              value={needTableCode ? filteredValue.code : filteredValue.name}
            >
              {needTableCode ? filteredValue.code : filteredValue.name}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};
