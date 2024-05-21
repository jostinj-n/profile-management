import React, { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { CompanyFilter } from "../CompanyFilter";
import { WorkStatusFilter } from "./StatusClassificationFilter";
import { LocationFilter } from "./LocationFilter";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import {
  fetchReferenceData,
  resetFilters,
  setFilters,
} from "@/app/redux/features/employeeTableSlice";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dictionary } from "@/dictionaries/dictionaries";
import { DivisionFilter } from "./DivisionFilter";
import { DepartmentFilter } from "./DepartmentFilter";
import { EmployementStatusFilter } from "./EmployementStatusFilter";
import { LanguageFilter } from "./LanguageFilter";

const filterSchema = z.object({
  companies: z.array(z.number()),
  divisions: z.array(z.number()),
  departments: z.array(z.number()),
  search: z.string(),
  union: z.boolean(),
  qualifications: z.array(z.number()),
  locations: z.array(z.number()),
  languages: z.array(z.number()),
  statusClassifications: z.array(z.number()),
  employmentStatus: z.array(z.number()),
  includeProtectedInactiveOnly: z.boolean()
});

export type FilterBarType = z.infer<typeof filterSchema>;

type Props = {
  filterLabels: Dictionary["employee"]["filterBar"];
  buttonLabels: Dictionary["button"];
};

export const FilterBar: FC<Props> = ({ filterLabels, buttonLabels }) => {
  const dispatch = useAppDispatch();
  const initialValue = useAppSelector((state) => state.employeeTable.filters);

  useEffect(() => {
    dispatch(fetchReferenceData());
  }, [dispatch])

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FilterBarType>({
    mode: "onBlur",
    resolver: zodResolver(filterSchema),
    defaultValues: {
      ...initialValue,
    },
  });

  return (
    <Stack direction={'column'} spacing={2} width="100%">
      <Typography variant="body1">Filters</Typography>
      <Controller
        control={control}
        name="search"
        render={({ field }) => (
          <TextField
            fullWidth
            inputRef={field.ref}
            size="medium"
            type="string"
            label={filterLabels.search}
            error={!!errors.search}
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchOutlinedIcon fontSize="medium" /></InputAdornment>,
            }}
            placeholder={filterLabels.searchExample}
            {...field}
          />
        )}
      />
      
      <CompanyFilter
        control={control}
        errors={errors}
        labels={filterLabels}
      />

      <DivisionFilter
        control={control}
        errors={errors}
        labels={filterLabels}
      />

      <LocationFilter
        control={control}
        errors={errors}
        labels={filterLabels}
      />

      <DepartmentFilter
        control={control}
        errors={errors}
        labels={filterLabels}
      />

      <EmployementStatusFilter
        control={control}
        errors={errors}
        labels={filterLabels}
      />
        
      <WorkStatusFilter
        control={control}
        errors={errors}
        labels={filterLabels}
      />

      <LanguageFilter
        control={control}
        errors={errors}
        labels={filterLabels}
      />

      <Controller
        name="includeProtectedInactiveOnly"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            label={filterLabels.includeProtectedInactiveOnly}
            control={
              <Checkbox
                name="includeProtectedInactiveOnly"
                checked={field.value}
                onBlur={field.onBlur}
                onChange={e => field.onChange(e.target.checked)}
              />
            }
          />
        )}
      />

      <Stack direction="row" gap={3}>
        <Button
          data-testid="continue-first-page"
          variant="contained"
          onClick={handleSubmit(
            (data) => {
              const filterData = {
                ...data,
              };
              return dispatch(setFilters(filterData));
            },
            (formErrors) => console.log("formErrors", formErrors),
          )}
        >
          {buttonLabels.apply}
        </Button>
        <Button variant="text" onClick={() => {dispatch(resetFilters()); reset();}}>{buttonLabels.clearAll}</Button>
      </Stack>
    </Stack>
  );
}
