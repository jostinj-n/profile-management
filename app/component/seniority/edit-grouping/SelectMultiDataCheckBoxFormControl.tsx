import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { DropdownOption } from "@/app/types/referenceData";
import { useGetFilterQuery } from "@/app/redux/features/seniority/filtersApi";

type Form<T extends FieldValues> = {
  control: Control<T>;
  errors: FieldErrors<T>;
  name: Path<T>;
  inputLabel: string;
  referenceTable: string;
};

export const SelectMultiDataCheckBoxFormControl = <T extends FieldValues>({
  control,
  errors,
  name,
  inputLabel,
  referenceTable,
}: Form<T>) => {
  const { data, isLoading } = useGetFilterQuery(referenceTable);
  if (isLoading) return;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl sx={{ width: "300px", minWidth: "300px" }}>
          <InputLabel>{inputLabel}</InputLabel>
          <Select
            multiple
            size="medium"
            label={inputLabel}
            inputRef={field.ref}
            error={!!errors[name]}
            renderValue={(selected) =>
              data
                ?.filter((item: DropdownOption) => selected.includes(item.id))
                .map((item) => item.name)
                .join(", ")
            }
            {...field}
          >
            {data?.map((item: DropdownOption) => (
              <MenuItem key={item.id} value={item.id}>
                <Checkbox checked={field.value?.indexOf(item.id) !== -1} />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};
