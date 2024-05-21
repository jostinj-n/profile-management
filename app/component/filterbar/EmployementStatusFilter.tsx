import { FC } from "react";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useAppSelector } from "@/app/redux/hooks";
import { Dictionary } from "@/dictionaries/dictionaries";
import { FilterBarType } from "@/app/component/filterbar/FilterBar";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { DropdownOption } from "@/app/types/referenceData";

type Props = {
  labels: Dictionary["employee"]["filterBar"]
  control: Control<FilterBarType>;
  errors: FieldErrors<FilterBarType>;
};

export const EmployementStatusFilter: FC<Props> = ({control, errors, labels}) => {
  const { employmentStatus: options } = useAppSelector((state) => state.employeeTable.referenceData);
  
  return (
    <Controller
      name="employmentStatus"
      control={control}
      render={({ field }) => (
        <FormControl>
          <InputLabel shrink>{labels.employmentStatus}</InputLabel>
          <Select
            multiple
            variant="outlined"
            size="medium"
            label={labels.employmentStatus}
            inputRef={field.ref}
            error={!!errors.employmentStatus}
            placeholder="Select"
            input={<OutlinedInput notched label={labels.employmentStatus} />}
            renderValue={selected => options.filter((opt: DropdownOption) => selected.includes(opt.id)).map(opt => opt.name).join(', ')}
            {...field}
          >
            {
              options.map((status: DropdownOption) => (
                <MenuItem key={status.id} value={status.id}>
                  <Checkbox checked={field.value.indexOf(status.id) !== -1} />
                  <ListItemText primary={status.name} />
                </MenuItem>
                )
              )
            }
          </Select>
        </FormControl>
      )}
    />
  )
}