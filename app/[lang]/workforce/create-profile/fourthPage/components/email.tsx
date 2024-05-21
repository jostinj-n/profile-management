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
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { FourthPageType } from "../fourthPage";
import { ControlledCheckbox } from "@/app/component/createNewProfile/ControlledCheckBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddOrCancelButton } from "@/app/component/createNewProfile/AddOrCancelButton";

type Props = {
  emailDictionnary: FourthPageDictionnary["section"]["email"];
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

export const Email: FC<Props> = ({
  emailDictionnary,
  control,
  errors,
  setValue,
}) => {
  const [numOfEmail, setNumOfEmail] = useState<number>(1);
  const numOfEmailMax = 2;
  const handleDelete = (index: number) => {
    setNumOfEmail((currentNum) => {
      const updatedNumOfEmail = control._formValues.emails.filter(
        (_: unknown, idx: number) => idx !== index,
      );
      setValue("emails", updatedNumOfEmail);
      return currentNum - 1;
    });
  };
  const [indexOfPrimary, setIndexOfPrimary] = useState(0);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    setIndexOfPrimary(index);
    // Update the form state for each phone number
    const updatedEmails = control._formValues.emails.map(
      (email: object, idx: number) => ({
        ...email,
        primaryNumber: idx === index,
      }),
    );
    // Update the form data
    setValue("emails", updatedEmails);
  };
  const defaultEmailEntry = {
    workEmail: "",
    primaryEmail: false,
    generalCorrespondance: false,
  };
  const handleAddEmail = () => {
    // Update the form data first
    const newEmails = [...control._formValues.emails, defaultEmailEntry];
    setValue("emails", newEmails);

    // Then update the state based on the new length of the phones array
    setNumOfEmail(newEmails.length);
  };
  return (
    <Stack gap={2}>
      <Typography variant="h6">{emailDictionnary.label}</Typography>
      {Array.from(Array(numOfEmail).keys()).map((index) => (
        <>
          {index !== 0 && ( // Assuming you don't want to delete the first address
            <Divider />
          )}
          <Stack>
            <Stack direction={"row"}>
              <Controller
                control={control}
                name={`emails.${index}.email`}
                render={({ field }) => (
                  <TextField
                    required
                    sx={{ width: "624px" }}
                    fullWidth
                    label={emailDictionnary.personalEmail}
                    placeholder={emailDictionnary.personalEmail}
                    helperText={errors.emails?.[index]?.message}
                    inputRef={field.ref}
                    error={!!errors.emails?.[index]?.email}
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
            <Stack direction={"row"}>
              <Controller
                control={control}
                name={`emails.${index}.primaryEmail`}
                render={({ field }) => (
                  <FormControl component="fieldset">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            {...field}
                            onChange={(event) => handleChange(event, index)}
                            checked={index === indexOfPrimary}
                          />
                        }
                        label={emailDictionnary.checkbox.primaryEmail}
                      />
                    </FormGroup>
                  </FormControl>
                )}
              />

              <ControlledCheckbox
                control={control}
                name={`emails.${index}.generalCorrespondance`}
                label={emailDictionnary.checkbox.generalCorrespondenceAllowed}
              />
            </Stack>
          </Stack>
        </>
      ))}
      <AddOrCancelButton
        buttonText={emailDictionnary.addEmail}
        pressed={numOfEmail}
        max={numOfEmailMax}
        setPressed={handleAddEmail}
      />
    </Stack>
  );
};
