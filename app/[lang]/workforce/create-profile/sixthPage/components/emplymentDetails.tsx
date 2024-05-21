import React, { FC } from "react";
import { Stack, Typography } from "@mui/material";
import { SixthPageDictionnary } from "@/dictionaries/dictionaries";
import { Control, useWatch } from "react-hook-form";
import { SixthPageType } from "../sisxthPage";
import { DatePickerComponent } from "@/app/component/createNewProfile/DatePicker";
import { ControlledCheckbox } from "@/app/component/createNewProfile/ControlledCheckBox";

type Props = {
  employmentDetails: SixthPageDictionnary["section"]["employmentDetails"];
  control: Control<SixthPageType>;
};

export const EmploymentDetails: FC<Props> = ({
  employmentDetails,
  control,
}) => {
  const jobHireDate = useWatch({
    control,
    name: "jobHireDate",
  });
  return (
    <Stack gap={3}>
      <Typography variant="h6">{employmentDetails.label}</Typography>
      <Stack direction={"row"} gap={3}>
        <Stack>
          <Stack gap={3}>
            <DatePickerComponent
              control={control}
              label={employmentDetails.jobHireDate}
              name="jobHireDate"
            />
            <DatePickerComponent
              control={control}
              label={employmentDetails.probationPeriod}
              name="probationPeriod"
              defaultValue={jobHireDate}
            />
            <DatePickerComponent
              control={control}
              label={employmentDetails.termination}
              name="terminationDate"
            />
            <ControlledCheckbox
              control={control}
              name="unionizedPosition"
              label={employmentDetails.unionizedPosition}
            />
          </Stack>
        </Stack>
        <Stack gap={3}>
          <DatePickerComponent
            control={control}
            label={employmentDetails.firstDayOfWork}
            name="firstDayOfWork"
            defaultValue={jobHireDate}
          />
          <DatePickerComponent
            control={control}
            label={employmentDetails.lastDay}
            name="lastDayOnRole"
          />
          <DatePickerComponent
            control={control}
            label={employmentDetails.originalHireDate}
            name="originalHireDate"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
