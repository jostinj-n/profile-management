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

export const LanguageFilter: FC<Props> = ({control, errors, labels}) => {
  const { languages: languageList } = useAppSelector((state) => state.employeeTable.referenceData);
  console.log('DivisionFilter.languages', languageList)
  return (
    <Controller
      name="languages"
      control={control}
      render={({ field }) => (
        <FormControl>
          <InputLabel shrink>{labels.languages}</InputLabel>
          <Select
            multiple
            variant="outlined"
            size="medium"
            label={labels.languages}
            inputRef={field.ref}
            error={!!errors.languages}
            placeholder="Select"
            input={<OutlinedInput notched label={labels.companies} />}
            renderValue={selected => languageList.filter((language: DropdownOption) => selected.includes(language.id)).map(language => language.name).join(', ')}
            {...field}
          >
            {
              languageList.map((language: DropdownOption) => (
                <MenuItem key={language.id} value={language.id}>
                  <Checkbox checked={field.value.indexOf(language.id) !== -1} />
                  <ListItemText primary={language.name} />
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