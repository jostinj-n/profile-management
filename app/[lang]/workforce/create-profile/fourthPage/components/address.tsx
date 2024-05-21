"use client";
import { FourthPageDictionnary } from "@/dictionaries/dictionaries";
import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { TextFieldComponent } from "@/app/component/createNewProfile/TextFieldComponent";
import { FourthPageType } from "../fourthPage";
import { ControlledCheckbox } from "@/app/component/createNewProfile/ControlledCheckBox";
import { AddOrCancelButton } from "@/app/component/createNewProfile/AddOrCancelButton";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  addressDictionnary: FourthPageDictionnary["section"]["address"];
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
};

export const Address: FC<Props> = ({
  addressDictionnary,
  control,
  errors,
  setValue,
}) => {
  const [numOfAddress, setNumOfAddress] = useState<number>(1);
  const handleDelete = (index: number) => {
    setNumOfAddress((currentNum) => {
      const updatedNumOfAddresses = control._formValues.addresses.filter(
        (_: unknown, idx: number) => idx !== index,
      );
      setValue("addresses", updatedNumOfAddresses);
      return currentNum - 1;
    });
  };
  return (
    <Stack gap={3}>
      <Typography variant="h6">{addressDictionnary.label}</Typography>
      {Array.from(Array(numOfAddress).keys()).map((index) => (
        <>
          {index !== 0 && ( // Assuming you don't want to delete the first address
            <Divider />
          )}
          <Stack key={index} gap={3}>
            <Stack direction={"row"}>
              <Controller
                control={control}
                name={`addresses.${index}.address`}
                render={({ field }) => (
                  <TextField
                    sx={{ width: "624px" }}
                    fullWidth
                    label={addressDictionnary.label}
                    placeholder={
                      addressDictionnary.inputLabel.streetNameAndNumber
                    }
                    helperText={errors.addresses?.[index]?.message}
                    inputRef={field.ref}
                    error={!!errors.addresses?.[index]?.address}
                    autoComplete={"new-password"}
                    {...field}
                  />
                )}
              />
              {index !== 0 && ( // Assuming you don't want to delete the first address
                <Button
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(index)}
                  size="large"
                ></Button>
              )}
            </Stack>
            <Stack direction={"row"} gap={3}>
              <Stack gap={3}>
                <TextFieldComponent
                  control={control}
                  errors={errors.addresses?.[index]?.city}
                  name={`addresses.${index}.city`}
                  label={addressDictionnary.inputLabel.city}
                />
                <Stack>
                  <Stack>
                    <TextFieldComponent
                      control={control}
                      errors={errors.addresses?.[index]?.country}
                      name={`addresses.${index}.country`}
                      label={addressDictionnary.country}
                    />
                    <ControlledCheckbox
                      control={control}
                      name={`addresses.${index}.sameMailingAddress`}
                      label={addressDictionnary.chechbox.sameMailingAddress}
                    />
                  </Stack>
                </Stack>
              </Stack>
              <Stack gap={3}>
                <TextFieldComponent
                  control={control}
                  errors={errors.addresses?.[index]?.state}
                  name={`addresses.${index}.state`}
                  label={addressDictionnary.stateProvince}
                  required={false}
                />
                <TextFieldComponent
                  control={control}
                  name={`addresses.${index}.postalCode`}
                  label={addressDictionnary.postalCode}
                  errors={errors.addresses?.[index]?.postalCode}
                  required={false}
                />
              </Stack>
            </Stack>
          </Stack>
        </>
      ))}
      <AddOrCancelButton
        buttonText={addressDictionnary.addMailingAddress}
        pressed={numOfAddress}
        max={2}
        setPressed={() => setNumOfAddress(numOfAddress + 1)}
      />
      <Stack width={"30%"}>
        <Controller
          control={control}
          name="notes"
          render={({ field }) => (
            <TextField
              rows={4}
              multiline
              label={addressDictionnary.notes}
              placeholder={addressDictionnary.notes}
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
