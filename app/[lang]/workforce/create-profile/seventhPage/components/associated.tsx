"use client";
import { SeventhPageDictionnary } from "@/dictionaries/dictionaries";
import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { SelectFormControl } from "@/app/component/createNewProfile/SelectFormControl";
import { ControlledCheckbox } from "@/app/component/createNewProfile/ControlledCheckBox";
import { AddOrCancelButton } from "@/app/component/createNewProfile/AddOrCancelButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { SeventhPageType } from "../seventhPage";
import { DatePickerComponent } from "@/app/component/createNewProfile/DatePicker";

type Props = {
  associated: SeventhPageDictionnary["section"]["associated"];
  control: Control<SeventhPageType>;
  errors: FieldErrors<SeventhPageType>;
  setValue: (
    name: keyof SeventhPageType,
    value: any,
    options?: {
      shouldValidate?: boolean;
      shouldDirty?: boolean;
    },
  ) => void;
  data: [];
};

export const Associated: FC<Props> = ({
  associated,
  control,
  errors,
  setValue,
  data,
}) => {
  const [numOfLanguage, setNumOfLanguage] = useState<number>(1);
  const [numOfIDs, setNumOfIDs] = useState<number>(1);

  const handleDelete = (index: number, fieldName: "IDs" | "languages") => {
    const currentArray = control._formValues[fieldName];
    const updatedArray = currentArray.filter(
      (_: any, idx: number) => idx !== index,
    );
    setValue(fieldName, updatedArray);
    if (fieldName === "IDs") {
      setNumOfIDs(numOfIDs - 1);
    } else {
      setNumOfLanguage(numOfLanguage - 1);
    }
  };

  return (
    <Stack gap={3}>
      <Typography variant="h6">{associated.label}</Typography>
      {Array.from(Array(numOfIDs).keys()).map((index) => (
        <Stack key={index} gap={3}>
          {index !== 0 && ( // Assuming you don't want to delete the first address
            <Divider />
          )}
          <Stack gap={3}>
            <Stack direction={"row"}>
              <SelectFormControl
                control={control}
                errors={errors.IDs?.[index]?.otherEmployeeAssociatedIDType}
                name={`IDs.${index}.otherEmployeeAssociatedIDType`}
                values={data}
                inputLabel={associated.otherEmployeeAssociatedIDType}
                tableName="ref_id_type"
              />
              {index !== 0 && ( // Assuming you don't want to delete the first address
                <Button
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(index, "IDs")}
                  size="large"
                ></Button>
              )}
            </Stack>
            <Controller
              control={control}
              name={`IDs.${index}.otherEmployeeAssociatedIDValue`}
              render={({ field }) => (
                <TextField
                  sx={{ width: "300px", minWidth: "300px" }}
                  fullWidth
                  label={associated.otherEmployeeAssociatedIDValue}
                  placeholder={associated.otherEmployeeAssociatedIDValue}
                  helperText={errors.IDs?.[index]?.message}
                  inputRef={field.ref}
                  error={!!errors.IDs?.[index]?.otherEmployeeAssociatedIDValue}
                  {...field}
                />
              )}
            />
          </Stack>
          <DatePickerComponent
            control={control}
            label={associated.expiryDate}
            name={`IDs.${index}.expiryDate`}
          />
        </Stack>
      ))}
      <AddOrCancelButton
        buttonText={associated.addOtherAssociatedID}
        pressed={numOfLanguage}
        setPressed={() => setNumOfIDs(numOfIDs + 1)}
        max={3}
      />
      {Array.from(Array(numOfLanguage).keys()).map((index) => (
        <>
          {index !== 0 && ( // Assuming you don't want to delete the first address
            <Divider />
          )}
          <Stack direction={"row"}>
            <SelectFormControl
              control={control}
              errors={errors.languages?.[index]?.name}
              name={`languages.${index}.name`}
              values={data}
              inputLabel={associated.language}
              tableName="ref_language"
            />
            {index !== 0 && ( // Assuming you don't want to delete the first address
              <Button
                startIcon={<DeleteIcon />}
                onClick={() => handleDelete(index, "languages")}
                size="large"
              ></Button>
            )}
          </Stack>
        </>
      ))}
      <AddOrCancelButton
        buttonText={associated.addLanguage}
        pressed={numOfLanguage}
        setPressed={() => setNumOfLanguage(numOfLanguage + 1)}
        max={3}
      />
      <SelectFormControl
        control={control}
        errors={errors.CATSAJobLevel}
        name="CATSAJobLevel"
        values={data}
        inputLabel={associated.CATSAJobLevel}
        tableName="ref_catsa_job_level"
      />
      <Stack gap={3}>
        <Stack>
          <ControlledCheckbox
            control={control}
            name="isBilingual"
            label={associated.isBilingual}
          />
          <ControlledCheckbox
            control={control}
            name="activeUnionSteward"
            label={associated.activeUnionSteward}
          />
          <ControlledCheckbox
            control={control}
            name="isActiveHSCommitteeMember"
            label={associated.isActiveHSCommitteeMember}
          />
        </Stack>
        <Stack width={"30%"}>
          <Controller
            control={control}
            name="notes"
            render={({ field }) => (
              <TextField
                rows={4}
                multiline
                label={associated.notes}
                placeholder={associated.notes}
                helperText={errors.notes?.message}
                inputRef={field.ref}
                error={!!errors.notes}
                {...field}
              />
            )}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
