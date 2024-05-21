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

type Props = {
  labels: Dictionary["employee"]["filterBar"],
  control: Control<FilterBarType>;
  errors: FieldErrors<FilterBarType>;
}

export const WorkStatusFilter: FC<Props> = ({control, labels}) => {
  const { statusClassifications: workStatusList } = useAppSelector((state) => state.employeeTable.referenceData);

  return (
    <Controller
      control={control}
      name="statusClassifications"
      render={({ field }) => (
        <FormControl>
          <InputLabel shrink>{labels.statusClassification}</InputLabel>
          <Select
            multiple
            label={labels.statusClassification}
            size="medium"
            value={field.value}
            onChange={field.onChange}
            placeholder="Select"
            input={<OutlinedInput notched label={labels.statusClassification} />}
            renderValue={selected => workStatusList.filter(stat => selected.includes(stat.id)).map(stat => stat.name).join(', ')}
          >
            {
              workStatusList.map((statusType) => (
                <MenuItem key={statusType.id} value={statusType.id}>
                  <Checkbox checked={field.value.indexOf(statusType.id) !== -1} />
                  <ListItemText primary={statusType.name} />
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
      )}
    />
  )
}