"use client";

import { FirstPageDictionary } from "@/dictionaries/dictionaries";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { FirstPageType } from "@/app/[lang]/workforce/create-profile/firstPage/firstPage";
import { Option } from "@/app/[lang]/workforce/profile-update/types/referenceData";

type Props = {
  species: FirstPageDictionary["section"]["species"];
  control: Control<FirstPageType>;
  errors: FieldErrors<FirstPageType>;
  data: Option[];
};

export const Species: FC<Props> = ({ species, control, errors, data }) => {
  const filteredData = data.filter(
    (values) => values.table_name === "ref_species",
  );
  return (
    <Stack gap={2}>
      <Typography variant="h6">{species.label}</Typography>
      <Controller
        control={control}
        name={"species"}
        render={({ field }) => (
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)} // Update field value on change
            >
              {filteredData.map((value) => (
                <FormControlLabel
                  key={value.id}
                  value={value.name}
                  control={<Radio />}
                  label={value.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}
      />
      <Stack width={"30%"}>
        <Controller
          control={control}
          name="notes"
          render={({ field }) => (
            <TextField
              rows={4}
              multiline
              label={species.notes}
              placeholder={species.notes}
              helperText={errors.notes?.message}
              inputRef={field.ref}
              error={!!errors.notes}
              {...field}
            />
          )}
        />
      </Stack>
    </Stack>
  );
};
