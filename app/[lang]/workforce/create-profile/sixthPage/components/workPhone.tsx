import React, { FC } from "react";
import { Stack, Typography } from "@mui/material";
import { SixthPageDictionnary } from "@/dictionaries/dictionaries";
import { Control, FieldErrors } from "react-hook-form";
import { SixthPageType } from "../sisxthPage";
import { TextFieldComponent } from "@/app/component/createNewProfile/TextFieldComponent";
import { SelectFormControl } from "@/app/component/createNewProfile/SelectFormControl";

type Props = {
  workPhone: SixthPageDictionnary["section"]["workPhone"];
  control: Control<SixthPageType>;
  errors: FieldErrors<SixthPageType>;
  data: [];
};

export const WorkPhone: FC<Props> = ({ workPhone, control, errors, data }) => {
  return (
    <Stack gap={2}>
      <Typography variant="h6">{workPhone.label}</Typography>
      <Stack gap={3}>
        <Stack gap={3}>
          <Stack gap={3} direction={"row"}>
            <TextFieldComponent
              control={control}
              name={`workPhone`}
              label={workPhone.workPhone}
              errors={errors.workPhone}
            />
            <Stack direction={"row"}>
              <SelectFormControl
                control={control}
                errors={errors.phoneType}
                name={`phoneType`}
                values={data}
                inputLabel={workPhone.phoneType}
                tableName="ref_contact_type"
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
