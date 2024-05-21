import { TextField } from "@mui/material";
import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

type Form<T extends FieldValues> = {
  control: Control<T>;
  errors: FieldErrors<T>;
  name: Path<T>;
  label: string;
  width?: string;
  rows?: number;
};

export const TextAreaComponent = <T extends FieldValues>({
  control,
  errors,
  name,
  label,
  rows = 4,
}: Form<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <TextField
        rows={rows}
        fullWidth
        multiline
        label={label}
        placeholder={label}
        helperText={errors[name]?.message as string}
        inputRef={field.ref}
        error={!!errors[name]}
        {...field}
      />
    )}
  />
);
