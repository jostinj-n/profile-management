"use client";

import React, { FC, useState } from "react";
import { FirstPageDictionary } from "@/dictionaries/dictionaries";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { Control, FieldErrors } from "react-hook-form";
import { FirstPageType } from "@/app/[lang]/workforce/create-profile/firstPage/firstPage";

// eslint-disable-next-line import/no-extraneous-dependencies
import { TextFieldComponent } from "@/app/component/createNewProfile/TextFieldComponent";
import { DatePickerComponent } from "@/app/component/createNewProfile/DatePicker";
import { AddOrCancelButton } from "@/app/component/createNewProfile/AddOrCancelButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { SelectFormControl } from "@/app/component/createNewProfile/SelectFormControl";

type Props = {
  personalDetails: FirstPageDictionary["section"]["personalDetails"];
  control: Control<FirstPageType>;
  errors: FieldErrors<FirstPageType>;
  setValue: (
    name: keyof FirstPageType,
    value: any,
    options?: {
      shouldValidate?: boolean;
      shouldDirty?: boolean;
    },
  ) => void;
  data: [];
};

export const PersonalDetails: FC<Props> = ({
  personalDetails,
  control,
  errors,
  setValue,
  data,
}) => {
  const [numOfPersonalDetails, setNumOfPersonalDetails] = useState(1);
  const handleDelete = (index: number) => {
    setNumOfPersonalDetails((currentNum) => {
      const updatedPersonalDetails = control._formValues.personalDetails.filter(
        (_: unknown, idx: number) => idx !== index,
      );
      // Update the form data
      setValue("personalDetails", updatedPersonalDetails);
      return currentNum - 1;
    });
  };
  return (
    <Stack gap={2}>
      <Typography variant="h6">{personalDetails.label}</Typography>
      <Stack direction="column" gap={3}>
        {Array.from(Array(numOfPersonalDetails).keys()).map((index) => (
          <Stack gap={3} key={index}>
            {index !== 0 && ( // Assuming you don't want to delete the first address
              <Divider />
            )}
            <Stack direction={"row"} gap={3}>
              <TextFieldComponent
                control={control}
                name={`personalDetails.${index}.firstName`}
                label={personalDetails.firstName}
                errors={errors.personalDetails?.[index]?.firstName}
                required
              />
              <Stack direction={"row"}>
                <TextFieldComponent
                  control={control}
                  name={`personalDetails.${index}.lastName`}
                  label={personalDetails.lastName}
                  errors={errors.personalDetails?.[index]?.lastName}
                  required
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
            {index == 0 && ( // Assuming you don't want to render middle name and preferred name more than once
              <Stack direction={"row"} gap={3}>
                <TextFieldComponent
                  control={control}
                  name={`middleName`}
                  label={personalDetails.middleName}
                  errors={errors.middleName}
                />
                <TextFieldComponent
                  control={control}
                  name={`preferredName`}
                  label={personalDetails.preferredName}
                  errors={errors.preferredName}
                />
              </Stack>
            )}
          </Stack>
        ))}
        <AddOrCancelButton
          buttonText={personalDetails.addFormerLegalName}
          pressed={numOfPersonalDetails}
          setPressed={() => setNumOfPersonalDetails(numOfPersonalDetails + 1)}
          max={2}
        />
      </Stack>

      <Stack gap={3} mt={5}>
        <DatePickerComponent
          control={control}
          label={personalDetails.dateOfBirth}
          name="dateOfBirth"
        />
        <Stack direction={"row"} gap={3}>
          <SelectFormControl
            control={control}
            errors={errors.gender}
            name="gender"
            values={data}
            tableName="ref_gender"
            inputLabel={personalDetails.gender}
            required
          />
          <SelectFormControl
            control={control}
            errors={errors.pronoun}
            name="pronoun"
            tableName="ref_personal_pronoun"
            values={data}
            inputLabel={personalDetails.pronoun}
          />
        </Stack>
        <SelectFormControl
          control={control}
          errors={errors.primaryCommunicationLanguage}
          name="primaryCommunicationLanguage"
          values={data}
          tableName="ref_language"
          inputLabel={personalDetails.primaryCommunicationLanguage}
          required
        />
      </Stack>
    </Stack>
  );
};
