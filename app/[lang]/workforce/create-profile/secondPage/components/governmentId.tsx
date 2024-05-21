"use client";
import { Dictionary } from "@/dictionaries/dictionaries";
import { Button, Divider, Stack, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { SecondPageType } from "../secondPage";
import { Control, FieldErrors } from "react-hook-form";
import { SelectFormControl } from "@/app/component/createNewProfile/SelectFormControl";
import { AddOrCancelButton } from "@/app/component/createNewProfile/AddOrCancelButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { DatePickerComponent } from "@/app/component/createNewProfile/DatePicker";
import { TextFieldComponent } from "@/app/component/createNewProfile/TextFieldComponent";

type Props = {
  governmentID: Dictionary["workforce"]["newProfile"]["secondPage"]["section"]["governmentID"];
  control: Control<SecondPageType>;
  errors: FieldErrors<SecondPageType>;
  setValue: (
    name: keyof SecondPageType,
    value: any,
    options?: {
      shouldValidate?: boolean;
      shouldDirty?: boolean;
    },
  ) => void;
  data: [];
};

export const GovernmentId: FC<Props> = ({
  governmentID,
  control,
  errors,
  setValue,
  data,
}) => {
  const [numOfGovIds, setNumOfGovIds] = useState(1);
  const handleDelete = (index: number) => {
    setNumOfGovIds((currentNum) => {
      const updatedGovermentIDs = control._formValues.governmentIDs.filter(
        (_: unknown, idx: number) => idx !== index,
      );
      // Update the form data
      setValue("governmentIDs", updatedGovermentIDs);
      return currentNum - 1;
    });
  };
  return (
    <Stack gap={3}>
      <Typography variant="h6">{governmentID.label}</Typography>
      {Array.from(Array(numOfGovIds).keys()).map((index) => (
        <>
          {index !== 0 && ( // Assuming you don't want to delete the first address
            <Divider />
          )}
          <Stack gap={3} direction={"row"}>
            <SelectFormControl
              control={control}
              errors={errors.governmentIDs?.[index]?.typeOfId}
              name={`governmentIDs.${index}.typeOfId`}
              values={data}
              inputLabel={governmentID.typeOfId}
              tableName="ref_id_type"
              required
            />
            <Stack direction={"row"}>
              <SelectFormControl
                control={control}
                errors={errors.governmentIDs?.[index]?.issuedByAgency}
                name={`governmentIDs.${index}.issuedByAgency`}
                values={data}
                inputLabel={governmentID.issuedByAgency}
                tableName="ref_id_issuing_agency"
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
          <Stack gap={3} direction={"row"}>
            <TextFieldComponent
              control={control}
              name={`governmentIDs.${index}.issuedValue`}
              label={governmentID.issuedValue}
              errors={errors.governmentIDs?.[index]?.issuedValue}
            />
            <DatePickerComponent
              control={control}
              label={governmentID.expiryDate}
              name={`governmentIDs.${index}.expiryDate`}
            />
          </Stack>
        </>
      ))}
      <AddOrCancelButton
        buttonText={governmentID.addGovernmentId}
        pressed={numOfGovIds}
        max={5}
        setPressed={() => setNumOfGovIds(numOfGovIds + 1)}
      />
    </Stack>
  );
};
