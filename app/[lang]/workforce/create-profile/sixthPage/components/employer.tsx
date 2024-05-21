import React, { FC, useState } from "react";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { SixthPageDictionnary } from "@/dictionaries/dictionaries";
import { Control, FieldErrors } from "react-hook-form";
import { SixthPageType } from "../sisxthPage";
import { SelectFormControl } from "@/app/component/createNewProfile/SelectFormControl";
import { AddOrCancelButton } from "@/app/component/createNewProfile/AddOrCancelButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Option } from "@/app/[lang]/workforce/profile-update/types/referenceData";

type Props = {
  employer: SixthPageDictionnary["section"]["employer"];
  control: Control<SixthPageType>;
  errors: FieldErrors<SixthPageType>;
  setValue: (
    name: keyof SixthPageType,
    value: any,
    options?: {
      shouldValidate?: boolean;
      shouldDirty?: boolean;
    },
  ) => void;
  data: Option[];
};

export const Employer: FC<Props> = ({
  employer,
  control,
  errors,
  setValue,
  data,
}) => {
  const [numOfWorkLocation, setNumOfWorkLocation] = useState(1);
  const handleDelete = (index: number) => {
    setNumOfWorkLocation((currentNum) => {
      const updatedWorkLocations =
        control._formValues.primaryWorkLocations.filter(
          (_: unknown, idx: number) => idx !== index,
        );
      // Update the form data
      setValue("primaryWorkLocations", updatedWorkLocations);
      return currentNum - 1;
    });
  };
  return (
    <Stack>
      <Typography variant="h6">{employer.label}</Typography>
      <Stack gap={3}>
        <Stack gap={3}>
          <SelectFormControl
            control={control}
            required
            errors={errors.company}
            name={"company"}
            values={data}
            inputLabel={employer.company}
            tableName="ref_company"
          />
        </Stack>
        <Stack gap={3}>
          <Stack gap={3} direction={"row"}>
            <SelectFormControl
              control={control}
              required
              errors={errors.division}
              name="division"
              values={data}
              inputLabel={employer.division}
              tableName="ref_division"
            />
            <SelectFormControl
              control={control}
              errors={errors.department}
              name="department"
              required
              values={data}
              inputLabel={employer.department}
              tableName="ref_department"
            />
          </Stack>
          {Array.from(Array(numOfWorkLocation).keys()).map((index) => (
            <Stack key={index} gap={3}>
              {index !== 0 && ( // Assuming you don't want to delete the first address
                <Divider />
              )}
              <Stack gap={3} direction={"row"}>
                <SelectFormControl
                  control={control}
                  required
                  errors={
                    errors.primaryWorkLocations?.[index]?.primaryWorkLocation
                  }
                  name={`primaryWorkLocations.${index}.primaryWorkLocation`}
                  values={data}
                  inputLabel={employer.primaryWorkLocation}
                  tableName="ref_work_location"
                />
                <SelectFormControl
                  required
                  control={control}
                  errors={
                    errors.primaryWorkLocations?.[index]
                      ?.primaryWorkLocationCode
                  }
                  name={`primaryWorkLocations.${index}.primaryWorkLocationCode`}
                  values={data}
                  inputLabel={employer.primaryWorkLocationCode}
                  needTableCode
                  tableName="ref_work_location"
                />
                {index !== 0 && ( // Assuming you don't want to delete the first address
                  <Button
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(index)}
                    size="large"
                  ></Button>
                )}
              </Stack>
            </Stack>
          ))}
          <AddOrCancelButton
            buttonText={employer.add}
            pressed={numOfWorkLocation}
            setPressed={() => setNumOfWorkLocation(numOfWorkLocation + 1)}
            max={2}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
