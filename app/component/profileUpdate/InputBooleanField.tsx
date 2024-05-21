import {
  Control,
  Controller,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import { Checkbox, FormControlLabel } from "@mui/material";

type Form<T extends FieldValues> = {
  control: Control<T>;
  label: string;
} & UseControllerProps<T>;

export const InputBooleanField = <T extends FieldValues>({
  control,
  name,
  label,
}: Form<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <FormControlLabel
        control={<Checkbox {...field} checked={field.value} />}
        label={label}
      />
    )}
  />
);
