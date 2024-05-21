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
  labels: Dictionary["employee"]["filterBar"];
  control: Control<FilterBarType>;
  errors: FieldErrors<FilterBarType>;
};

export const DivisionFilter: FC<Props> = ({control, errors, labels}) => {
  const { divisions: divisionsList } = useAppSelector((state) => state.employeeTable.referenceData);

  return (
    <Controller
      name="divisions"
      control={control}
      render={({ field }) => (
        <FormControl>
          <InputLabel shrink>{labels.divisions}</InputLabel>
          <Select
            multiple
            variant="outlined"
            size="medium"
            label={labels.divisions}
            inputRef={field.ref}
            error={!!errors.divisions}
            placeholder="Select"
            input={<OutlinedInput notched label={labels.companies} />}
            renderValue={selected => divisionsList.filter((division: DropdownOption) => selected.includes(division.id)).map(division => division.name).join(', ')}
            {...field}
          >
            {
              divisionsList.map((division: DropdownOption) => (
                <MenuItem key={division.id} value={division.id}>
                  <Checkbox checked={field.value.indexOf(division.id) !== -1} />
                  <ListItemText primary={division.name} />
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