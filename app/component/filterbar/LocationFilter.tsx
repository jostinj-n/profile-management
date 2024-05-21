import React, { FC } from "react";
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
  labels: Dictionary["employee"]["filterBar"];
  control: Control<FilterBarType>;
  errors: FieldErrors<FilterBarType>;
};

export const LocationFilter: FC<Props> = ({control, labels}) => {
  const { locations: locationsList } = useAppSelector((state) => state.employeeTable.referenceData);

  return (
    <Controller
      control={control}
      name="locations"
      render={({ field }) => (
        <FormControl>
          <InputLabel shrink>{labels.locations}</InputLabel>
          <Select
            multiple
            size="medium"
            value={field.value}
            onChange={field.onChange}
            placeholder="Select"
            label={labels.locations}
            input={<OutlinedInput notched label={labels.locations} />}
            renderValue={selected => locationsList.filter(loc => selected.includes(loc.id)).map(loc => loc.name).join(', ')}
          >
            {
              locationsList.map((location) => (
                <MenuItem key={location.id} value={location.id}>
                  <Checkbox checked={field.value.indexOf(location.id) !== -1} />
                  <ListItemText primary={`${location.name} ${location.code ? `(${location.code})` : ''}`} />
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
      )}
    />
  )
}