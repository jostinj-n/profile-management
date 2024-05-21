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
import { DropdownOption } from "../types/referenceData";

type Props = {
  labels: Dictionary["employee"]["filterBar"];
  control: Control<FilterBarType>;
  errors: FieldErrors<FilterBarType>;
};

export const CompanyFilter: FC<Props> = ({control, errors, labels}) => {
  const { companies: companiesList } = useAppSelector((state) => state.employeeTable.referenceData);
  console.log('ComapnyFilter.companies', companiesList)
  return (
    <Controller
      name="companies"
      control={control}
      render={({ field }) => (
        <FormControl>
          <InputLabel shrink>{labels.companies}</InputLabel>
          <Select
            multiple
            variant="outlined"
            size="medium"
            label={labels.companies}
            inputRef={field.ref}
            error={!!errors.companies}
            placeholder="Select"
            input={<OutlinedInput notched label={labels.companies} />}
            renderValue={selected => companiesList.filter((company: DropdownOption) => selected.includes(company.id)).map(company => company.name).join(', ')}
            {...field}
          >
            {
              companiesList.map((company: DropdownOption) => (
                <MenuItem key={company.id} value={company.id}>
                  <Checkbox checked={field.value.indexOf(company.id) !== -1} />
                  <ListItemText primary={company.name} />
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