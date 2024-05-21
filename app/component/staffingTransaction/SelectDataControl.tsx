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
  Controller,
  FieldErrors,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

type Form<T extends FieldValues> = {
  errors: FieldErrors<T>;
  inputLabel: string;
  data: string[];
  required?: boolean;
  isMultiple?: boolean;
  isDisabled?: boolean;
  onValueSelected?: (val: string) => void;
} & UseControllerProps<T>;

export const SelectDataControl = <T extends FieldValues>({
  control,
  errors,
  name,
  inputLabel,
  data,
  required = false,
  isMultiple = false,
  isDisabled = false,
  onValueSelected,
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
    if (onValueSelected) onValueSelected(value);
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
          disabled={isDisabled}
        >
          <InputLabel id={"select"} required={required}>
            {inputLabel}
          </InputLabel>
          <Select
            required={required}
            multiple={isMultiple}
            label={inputLabel}
            inputRef={field.ref}
            {...field}
            onChange={(event) => handleChange(event, field.onChange)}
          >
            <MenuItem value={""}>
              <em>Select</em>
            </MenuItem>
            {data?.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors[name]?.message as string}</FormHelperText>
        </FormControl>
      )}
    />
  );
};
