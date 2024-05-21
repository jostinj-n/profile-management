import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type CheckboxProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
};

export const ControlledCheckbox = <T extends FieldValues>({
  control,
  name,
  label,
}: CheckboxProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl component="fieldset">
          <FormGroup>
            <FormControlLabel control={<Checkbox {...field} />} label={label} />
          </FormGroup>
        </FormControl>
      )}
    />
  );
};
