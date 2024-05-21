"use client";
import { FourthPageDictionnary } from "@/dictionaries/dictionaries";
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { TextFieldComponent } from "@/app/component/createNewProfile/TextFieldComponent";
import { SelectFormControl } from "@/app/component/createNewProfile/SelectFormControl";
import { FourthPageType } from "../fourthPage";
import { ControlledCheckbox } from "@/app/component/createNewProfile/ControlledCheckBox";
import { AddOrCancelButton } from "@/app/component/createNewProfile/AddOrCancelButton";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  phoneDictionnary: FourthPageDictionnary["section"]["phone"];
  control: Control<FourthPageType>;
  errors: FieldErrors<FourthPageType>;
  setValue: (
    name: keyof FourthPageType,
    value: any,
    options?: {
      shouldValidate?: boolean;
      shouldDirty?: boolean;
    },
  ) => void;
  data: [];
};

export const Phone: FC<Props> = ({
  phoneDictionnary,
  control,
  errors,
  setValue,
  data,
}) => {
  const [numOfPhone, setNumOfPhone] = useState<number>(1);
  const numOfPhoneMaximum: number = 2;

  const defaultPhoneEntry = {
    phoneNumber: "",
    phoneType: "",
    primaryNumber: false,
    allowSMS: false,
  };
  const handleAddPhone = () => {
    const newPhones = [...control._formValues.phones, defaultPhoneEntry];
    setValue("phones", newPhones);
    setNumOfPhone(newPhones.length);
  };

  const handleDelete = (index: number) => {
    setNumOfPhone((currentNum) => {
      const updatedNumOfPhone = control._formValues.phones.filter(
        (_: unknown, idx: number) => idx !== index,
      );
      // Update the form data
      setValue("phones", updatedNumOfPhone);
      return currentNum - 1;
    });
  };

  const handleChange = (index: number) => {
    const updatedPhones = control._formValues.phones.map(
      (phone: any, idx: number) => ({
        ...phone,
        primaryNumber: idx === index,
      }),
    );
    setValue("phones", updatedPhones);
  };

  return (
    <Stack gap={3}>
      <Typography variant="h6">{phoneDictionnary.label}</Typography>
      {Array.from(Array(numOfPhone).keys()).map((index) => (
        <>
          {index !== 0 && ( // Assuming you don't want to delete the first address
            <Divider />
          )}
          <Stack direction="row" gap={3}>
            <TextFieldComponent
              control={control}
              name={`phones.${index}.phoneNumber`}
              label={phoneDictionnary.phoneNumber}
              errors={errors.phones?.[index]?.phoneNumber}
              required
            />
            <Stack direction={"row"}>
              <SelectFormControl
                control={control}
                errors={errors.phones?.[index]?.phoneType}
                name={`phones.${index}.phoneType`}
                values={data}
                inputLabel={phoneDictionnary.phoneType}
                tableName="ref_contact_type"
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
          <Stack>
            <Stack direction={"row"}>
              <Controller
                control={control}
                name={`phones.${index}.primaryNumber`}
                render={({ field }) => (
                  <FormControl component="fieldset">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            {...field}
                            onChange={() => handleChange(index)}
                            checked={
                              control._formValues.phones[index].primaryNumber
                            }
                          />
                        }
                        label={phoneDictionnary.checkbox.primaryNumber}
                      />
                    </FormGroup>
                  </FormControl>
                )}
              />
              <ControlledCheckbox
                control={control}
                name={`phones.${index}.allowSMS`}
                label={phoneDictionnary.checkbox.allowSMS}
              />
            </Stack>
          </Stack>
        </>
      ))}
      <AddOrCancelButton
        buttonText={phoneDictionnary.addPhone}
        pressed={numOfPhone}
        max={numOfPhoneMaximum}
        setPressed={handleAddPhone}
      />
    </Stack>
  );
};
