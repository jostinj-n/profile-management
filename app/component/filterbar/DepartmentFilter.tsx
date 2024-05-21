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

export const DepartmentFilter: FC<Props> = ({control, errors, labels}) => {
  const { departments: departmentList } = useAppSelector((state) => state.employeeTable.referenceData);

  return (
    <Controller
      name="departments"
      control={control}
      render={({ field }) => (
        <FormControl>
          <InputLabel shrink>{labels.departments}</InputLabel>
          <Select
            multiple
            variant="outlined"
            size="medium"
            label={labels.departments}
            inputRef={field.ref}
            error={!!errors.departments}
            placeholder="Select"
            input={<OutlinedInput notched label={labels.departments} />}
            renderValue={selected => departmentList.filter((department: DropdownOption) => selected.includes(department.id)).map(department => department.name).join(', ')}
            {...field}
          >
            {
              departmentList.map((department: DropdownOption) => (
                <MenuItem key={department.id} value={department.id}>
                  <Checkbox checked={field.value.indexOf(department.id) !== -1} />
                  <ListItemText primary={department.name} />
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