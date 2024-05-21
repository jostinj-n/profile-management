import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import {
  Control,
  Controller,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

type Form<T extends FieldValues> = {
  control: Control<T>;
  label: string;
  values: string[];
  required?: boolean;
} & UseControllerProps<T>;

export const RadioComponent = <T extends FieldValues>({
  control,
  name,
  label,
  values,
  required = false,
}: Form<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <FormControl>
        <FormLabel id="radio" required={required}>
          {label}
        </FormLabel>
        <RadioGroup
          {...field}
          aria-labelledby="purpose"
          name="radio-buttons-group"
        >
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {values.map((item) => (
              <Grid item xs={6} key={item}>
                <FormControlLabel
                  value={item}
                  control={<Radio />}
                  label={item}
                />
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </FormControl>
    )}
  />
);
