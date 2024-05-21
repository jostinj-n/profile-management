import React, { FC } from "react";
import { Stack, TextField, Typography } from "@mui/material";
import { SixthPageDictionnary } from "@/dictionaries/dictionaries";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { SixthPageType } from "../sisxthPage";

type Props = {
  workEmail: SixthPageDictionnary["section"]["workEmail"];
  control: Control<SixthPageType>;
  errors: FieldErrors<SixthPageType>;
};

export const WorkEmail: FC<Props> = ({ workEmail, control, errors }) => {
  return (
    <Stack gap={3}>
      <Typography variant="h6">{workEmail.label}</Typography>
      <Stack gap={3}>
        <Stack direction={"row"}>
          <Controller
            control={control}
            name={`workEmail`}
            render={({ field }) => (
              <TextField
                sx={{ width: "624px" }}
                fullWidth
                label={workEmail.workEmail}
                placeholder={workEmail.workEmail}
                helperText={errors.workEmail?.message}
                inputRef={field.ref}
                error={!!errors.workEmail}
                {...field}
                autoComplete={"new-password"}
              />
            )}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
