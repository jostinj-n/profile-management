import { FC, useEffect, useState } from "react";
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
import { FifthPageDictionnary } from "@/dictionaries/dictionaries";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import { FifthPageType } from "../fifthPage";
import { ControlledCheckbox } from "@/app/component/createNewProfile/ControlledCheckBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddOrCancelButton } from "@/app/component/createNewProfile/AddOrCancelButton";
import { EmailType } from "@/app/redux/features/newProfileSlice";

type Props = {
  indexEmergencyContacts: number;
  email: FifthPageDictionnary["section"]["email"];
  control: Control<FifthPageType>;
  errors: FieldErrors<FifthPageType>;
  setValue: UseFormSetValue<FifthPageType>;
};

export const Email: FC<Props> = ({
  indexEmergencyContacts,
  email,
  control,
  errors,
  setValue,
}) => {
  const [numOfEmail, setNumOfEmail] = useState<number>(1);
  const emails = control._formValues[indexEmergencyContacts].emails;

  useEffect(() => {
    // Find the index of the primary phone
    const primaryIndex = control._formValues[
      indexEmergencyContacts
    ].emails.findIndex((inEmail: EmailType) => inEmail.primaryEmail);
    if (primaryIndex !== -1) {
    }
    // Update the number of phone fields based on the current form data
    const currentEmailCount =
      control._formValues[indexEmergencyContacts].emails?.length || 1;
    setNumOfEmail(currentEmailCount);
  }, [emails, control._formValues, indexEmergencyContacts]);

  const numOfEmailMax = 2;
  const handleDelete = (index: number) => {
    setNumOfEmail((currentNum) => {
      const updatedNumOfEmail = control._formValues[
        indexEmergencyContacts
      ].emails.filter((_: unknown, idx: number) => idx !== index);
      // Update the form data
      setValue(`${indexEmergencyContacts}.emails`, updatedNumOfEmail);
      return currentNum - 1;
    });
    // Additional logic to update form data if using React Hook Form or similar
  };
  const handleChange = (index: number) => {
    // Update the form state for each phone number
    const updatedEmails = control._formValues[
      indexEmergencyContacts
    ].emails.map((inEmail: object, idx: number) => ({
      ...inEmail,
      primaryEmail: idx === index,
    }));
    // Update the form data
    setValue(`${indexEmergencyContacts}.emails`, updatedEmails);
  };

  const defaultEmailEntry = {
    workEmail: "",
    primaryEmail: false,
    generalCorrespondance: false,
  };
  const handleAddEmail = () => {
    // Update the form data first
    const newEmails = [
      ...control._formValues[indexEmergencyContacts].emails,
      defaultEmailEntry,
    ];
    setValue(`${indexEmergencyContacts}.emails`, newEmails);

    // Then update the state based on the new length of the phones array
    setNumOfEmail(newEmails.length);
  };

  return (
    <Stack gap={3}>
      <Typography variant="h6">{email.label}</Typography>
      {Array.from(Array(numOfEmail).keys()).map((index) => (
        <>
          {index !== 0 && ( // Assuming you don't want to delete the first address
            <Divider />
          )}
          <Stack>
            <Stack direction={"row"}>
              <Controller
                control={control}
                name={`${indexEmergencyContacts}.emails.${index}.email`}
                render={({ field }) => (
                  <TextField
                    sx={{ width: "624px" }}
                    fullWidth
                    label={email.emailAddress}
                    placeholder={email.emailAddress}
                    helperText={
                      errors[indexEmergencyContacts]?.emails?.[index]?.message
                    }
                    inputRef={field.ref}
                    autoComplete={"new-password"}
                    error={
                      !!errors[indexEmergencyContacts]?.emails?.[index]?.email
                    }
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
                name={`${indexEmergencyContacts}.emails.${index}.primaryEmail`}
                render={({ field }) => (
                  <FormControl component="fieldset">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            {...field}
                            onChange={() => handleChange(index)}
                            checked={field.value}
                          />
                        }
                        label={email.primary}
                      />
                    </FormGroup>
                  </FormControl>
                )}
              />

              <ControlledCheckbox
                control={control}
                name={`${indexEmergencyContacts}.emails.${index}.generalCorrespondance`}
                label={email.correspondence}
              />
            </Stack>
          </Stack>
        </>
      ))}
      <AddOrCancelButton
        buttonText={email.addEmail}
        pressed={numOfEmail}
        max={numOfEmailMax}
        setPressed={handleAddEmail}
      />
    </Stack>
  );
};
