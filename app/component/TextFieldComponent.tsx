import { TextField } from "@mui/material";
import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

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

type Form<T extends FieldValues> = {
  control: Control<T>;
  errors: FieldErrors<T>;
  label: string;
  width?: string;
  isDisabled?: boolean;
  required?: boolean;
  type?: string;
} & UseControllerProps<T>;
//TODO
//TODO
//TODO duplicate with app/component/createNewProfile/TextFieldComponent.tsx
//TODO
//TODO

export const TextFieldComponent = <T extends FieldValues>({
  control,
  errors,
  name,
  label,
  width = "300px",
  isDisabled = false,
  required = false,
  type = "text",
}: Form<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <TextField
        fullWidth
        required={required}
        sx={{ width: width, minWidth: "300px" }}
        label={label}
        placeholder={label}
        helperText={errors[name]?.message as string}
        inputRef={field.ref}
        error={!!errors[name]}
        {...field}
        disabled={isDisabled}
        type={type}
        autoComplete={getAutoComplete(field.name.toString())}
      />
    )}
  />
);
