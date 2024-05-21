import React, { FC } from "react";
import { Stack, TextField, Typography } from "@mui/material";
import { SixthPageDictionnary } from "@/dictionaries/dictionaries";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { SixthPageType } from "../sisxthPage";
import { SelectFormControl } from "@/app/component/createNewProfile/SelectFormControl";

type Props = {
  role: SixthPageDictionnary["section"]["role"];
  control: Control<SixthPageType>;
  errors: FieldErrors<SixthPageType>;
  data: [];
};

export const Role: FC<Props> = ({ role, control, errors, data }) => {
  return (
    <Stack>
      <Typography variant="h6">{role.label}</Typography>
      <Stack gap={3}>
        <Stack direction={"row"} gap={3}>
          <SelectFormControl
            control={control}
            required
            errors={errors.organizationRole}
            name="organizationRole"
            values={data}
            inputLabel={role.organizationRole}
            tableName="ref_organization_role"
          />
          <SelectFormControl
            control={control}
            errors={errors.organizationalRoleSubtype}
            name="organizationalRoleSubtype"
            values={data}
            inputLabel={role.organizationalRoleSubtype}
            tableName="ref_organization_role_subtype"
          />
        </Stack>
        <Stack>
          <Controller
            control={control}
            name={"jobTitle"}
            render={({ field }) => (
              <TextField
                sx={{ width: "624px" }}
                fullWidth
                required
                label={role.jobTitle}
                placeholder={role.jobTitle}
                helperText={errors.jobTitle?.message}
                inputRef={field.ref}
                error={!!errors.jobTitle}
                {...field}
              />
            )}
          />
        </Stack>
        <Stack direction={"row"} gap={3}>
          <SelectFormControl
            required
            control={control}
            errors={errors.employmentStatus}
            name="employmentStatus"
            values={data}
            inputLabel={role.employmentStatus}
            tableName="ref_employment_status"
          />
          <SelectFormControl
            required
            control={control}
            errors={errors.statusClassification}
            name="statusClassification"
            values={data}
            inputLabel={role.statusClassification}
            tableName="ref_employment_classification"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
