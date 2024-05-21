import React, { FC } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import { FifthPageDictionnary } from "@/dictionaries/dictionaries";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import { FifthPageType } from "../fifthPage";
import { TextFieldComponent } from "@/app/component/createNewProfile/TextFieldComponent";
import { SelectFormControl } from "@/app/component/createNewProfile/SelectFormControl";
import { ControlledCheckbox } from "@/app/component/createNewProfile/ControlledCheckBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddOrCancelButton } from "@/app/component/createNewProfile/AddOrCancelButton";

type Props = {
  indexEmergencyContacts: number;
  phone: FifthPageDictionnary["section"]["phone"];
  control: Control<FifthPageType>;
  errors: FieldErrors<FifthPageType>;
  setValue: UseFormSetValue<FifthPageType>;
  getValues: UseFormGetValues<FifthPageType>;
  data: [];
};

export const Phone: FC<Props> = ({
  indexEmergencyContacts,
  phone,
  control,
  errors,
  setValue,
  getValues,
  data,
}) => {
  const numberOfPhone = getValues(`${indexEmergencyContacts}.phones`).length;

  const numOfPhoneMaximum: number = 2;
  const handleDelete = (index: number) => {
    const newPhone = getValues(`${indexEmergencyContacts}.phones`).filter(
      (truc, idx) => idx !== index,
    );
    setValue(`${indexEmergencyContacts}.phones`, newPhone);
  };

  const handleChange = (index: number) => {
    setValue(
      `${indexEmergencyContacts}.phones.${index}.primaryNumber`,
      !getValues(`${indexEmergencyContacts}.phones.${index}.primaryNumber`),
    );
  };
  return (
    <Stack>
      <Typography variant="h6">{phone.label}</Typography>
      {Array.from(Array(numberOfPhone).keys()).map((index) => (
        <Stack key={index}>
          <Stack direction="row" gap={3}>
            <TextFieldComponent
              control={control}
              name={`${indexEmergencyContacts}.phones.${index}.phoneNumber`}
              label={phone.phoneNumber}
              errors={
                errors[indexEmergencyContacts]?.phones?.[index]?.phoneNumber
              }
              required
            />
            <Stack direction={"row"}>
              <SelectFormControl
                control={control}
                errors={
                  errors[indexEmergencyContacts]?.phones?.[index]?.phoneType
                }
                name={`${indexEmergencyContacts}.phones.${index}.phoneType`}
                values={data}
                inputLabel={phone.phoneType}
                tableName="ref_contact_type"
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
          <Stack>
            <Stack direction={"row"}>
              <Controller
                control={control}
                name={`${indexEmergencyContacts}.phones.${index}.primaryNumber`}
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
                        label={phone.primary}
                      />
                    </FormGroup>
                  </FormControl>
                )}
              />
              <ControlledCheckbox
                control={control}
                name={`${indexEmergencyContacts}.phones.${index}.allowSMS`}
                label={phone.allowSMS}
              />
            </Stack>
          </Stack>
        </Stack>
      ))}
      <AddOrCancelButton
        buttonText={phone.addPhone}
        pressed={numberOfPhone}
        max={numOfPhoneMaximum}
        setPressed={() =>
          setValue(`${indexEmergencyContacts}.phones.${numberOfPhone}`, {
            phoneNumber: "",
            phoneType: "",
            primaryNumber: false,
            allowSMS: false,
          })
        }
      />
    </Stack>
  );
};
