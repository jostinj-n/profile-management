import { TextField } from "@mui/material";
import React from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

type Form<T extends FieldValues> = {
  control: Control<T>;
  errors?: FieldError;
  label: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  startAdornment?: React.ReactNode;
  size?: "small" | "medium";
  type?: string;
  onChange?: (event: any) => void;
} & UseControllerProps<T>;

const getAutoComplete = (fieldName: string) => {
  //as always chrome decide to change up the game and decide to ignore "off" in case of fieldName that look like a form
  if (
    fieldName.includes("firstName") ||
    fieldName.includes("lastName") ||
    fieldName.includes("email") ||
    fieldName.includes("city") ||
    fieldName.includes("country") ||
    fieldName.includes("state") ||
    fieldName.includes("postalCode")
  ) {
    return "new-password";
  }
  return "off";
};

export const TextFieldComponent = <T extends FieldValues>({
  control,
  errors,
  name,
  label,
  required,
  disabled,
  placeholder,
  startAdornment,
  readOnly,
  type = "text",
  size = "medium",
  onChange,
}: Form<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <TextField
        fullWidth
        size={size}
        type={type}
        required={required}
        sx={{ width: "300px", minWidth: "300px" }}
        label={label}
        InputProps={{
          startAdornment,
          readOnly,
        }}
        placeholder={placeholder}
        helperText={errors?.message || " "}
        inputRef={field.ref}
        error={!!errors}
        {...field}
        onChange={(event) =>
          onChange ? field.onChange(onChange(event)) : field.onChange(event)
        }
        disabled={disabled}
        autoComplete={getAutoComplete(field.name.toString())}
      />
    )}
  />
);
