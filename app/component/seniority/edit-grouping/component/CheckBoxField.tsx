import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
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
};

export const CheckboxField = <T extends FieldValues>({
  control,

  name,
  inputLabel,
}: Form<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <FormControlLabel
        control={<Checkbox />}
        label={inputLabel}
        {...field}
        checked={field.value}
      />
    )}
  />
);
