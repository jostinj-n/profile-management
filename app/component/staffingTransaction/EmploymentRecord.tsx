import { EmploymentDetail } from "@/app/types/employment";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
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
  inputLabel: string;

  employmentDetails: EmploymentDetail[] | undefined;

  isMultiple?: boolean;
};

export const EmploymentRecordForm = <T extends FieldValues>({
  control,
  errors,
  name,
  inputLabel,

  employmentDetails,

  isMultiple = false,
}: Form<T>) => {
  const handleChange = (
    event: SelectChangeEvent,
    fieldOnChange: (
      value: string | number | readonly string[] | undefined
    ) => void
  ) => {
    const {
      target: { value },
    } = event;

    // Si la valeur est "0" et que le champ est en mode multiple
    if (isMultiple) {
      const selectedValues =
        typeof value === "string" ? value.split(",") : value;
      fieldOnChange(selectedValues.filter((item) => item != "0"));
    } else fieldOnChange(value);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl
          sx={{ width: "300px", minWidth: "300px" }}
          error={!!errors[name]}
        >
          <InputLabel id={"personId"}>{inputLabel}</InputLabel>
          <Select
            multiple={isMultiple}
            label={inputLabel}
            inputRef={field.ref}
            {...field}
            onChange={(event) => handleChange(event, field.onChange)}
          >
            <MenuItem value={0}>
              <em>Select</em>
            </MenuItem>
            {employmentDetails?.map((item) => (
              <MenuItem
                key={item.employmentDetailId}
                value={item.employmentDetailId}
              >
                {item.employmentStatus}- {item.jobTitle}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors[name]?.message as string}</FormHelperText>
        </FormControl>
      )}
    />
  );
};
