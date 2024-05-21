import { FilterResponse } from "@/app/api/seniority/filters/[name]/route";
import { useGetFilterQuery } from "@/app/redux/features/seniority/filtersApi";
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
  UseControllerProps,
} from "react-hook-form";

type Form<T extends FieldValues> = {
  control: Control<T>;
  errors: FieldErrors<T>;
  inputLabel: string;
  referenceTable: string;
  isMultiple?: boolean;
  required?: boolean;
  optionValueLabel?: keyof FilterResponse;
} & UseControllerProps<T>;

export const SelectRefDataFormControl = <T extends FieldValues>({
  control,
  errors,
  name,
  inputLabel,
  referenceTable,
  isMultiple = false,
  required = false,
  optionValueLabel = "id",
}: Form<T>) => {
  const { data, isLoading } = useGetFilterQuery(referenceTable);

  const handleChange = (
    event: SelectChangeEvent,
    fieldOnChange: (
      value: string | number | readonly string[] | number[] | undefined,
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

  if (isLoading) return;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl
          sx={{ width: "300px", minWidth: "300px" }}
          error={!!errors[name]}
        >
          <InputLabel id={referenceTable} required={required}>
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
            <MenuItem value={0}>
              <em>Select</em>
            </MenuItem>
            {data?.map((item) => (
              <MenuItem key={item.id} value={item[optionValueLabel]}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors[name]?.message as string}</FormHelperText>
        </FormControl>
      )}
    />
  );
};
