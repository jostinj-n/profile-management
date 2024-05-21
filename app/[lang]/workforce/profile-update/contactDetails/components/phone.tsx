"use client";
import { FourthPageDictionnary } from "@/dictionaries/dictionaries";
import { Button, Divider, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { Control, FieldErrors, useFieldArray } from "react-hook-form";
import { TextFieldComponent } from "@/app/component/createNewProfile/TextFieldComponent";
import { SelectFormControl } from "@/app/component/createNewProfile/SelectFormControl";
import AddIcon from "@mui/icons-material/Add";
import { DeleteButton } from "@/app/component/profileUpdate/deleteButton";
import { Option } from "@/app/[lang]/workforce/profile-update/types/referenceData";
import { ContactDetailsType } from "@/app/[lang]/workforce/profile-update/contactDetails/zodSchema/contactDetailsSchema";
import { InputBooleanField } from "@/app/component/profileUpdate/InputBooleanField";

type Props = {
  phoneDictionary: FourthPageDictionnary["section"]["phone"];
  control: Control<ContactDetailsType>;
  errors: FieldErrors<ContactDetailsType>;
  data: Option[];
};
const defaultPhone = {
  phoneNumber: "",
  personalDeviceTye: "",
  primaryNumber: false,
  SmsAllowed: false,
};
export const Phone: FC<Props> = ({
  phoneDictionary,
  control,
  errors,
  data,
}) => {
  const { fields, append, remove } = useFieldArray({
    name: "phones",
    control,
  });
  return (
    <Stack gap={1.5}>
      <Typography variant="body1">{phoneDictionary.label}</Typography>
      {fields.map((field, index) => {
        return (
          <Stack key={field.id}>
            {index !== 0 && ( // Assuming you don't want to delete the first address
              <Divider sx={{ marginBottom: "1.2rem" }} />
            )}
            <Stack direction="row" gap={3}>
              <TextFieldComponent
                control={control}
                name={`phones.${index}.phoneNumber`}
                label={phoneDictionary.phoneNumber}
                errors={errors.phones?.[index]?.phoneNumber}
                required
                size={"small"}
              />
              <Stack direction={"row"} alignItems={"start"}>
                <SelectFormControl
                  control={control}
                  errors={errors.phones?.[index]?.personalDeviceTye}
                  name={`phones.${index}.personalDeviceTye`}
                  values={data}
                  inputLabel={phoneDictionary.phoneType}
                  tableName="ref_contact_type"
                  size={"small"}
                />
                {index !== 0 && ( // Assuming you don't want to delete the first names
                  <DeleteButton remove={remove} index={index} />
                )}
              </Stack>
            </Stack>
            <Stack>
              <Stack direction={"row"}>
                <InputBooleanField
                  control={control}
                  label={phoneDictionary.checkbox.primaryNumber}
                  name={`phones.${index}.primaryNumber`}
                />
                <InputBooleanField
                  control={control}
                  label={phoneDictionary.checkbox.allowSMS}
                  name={`phones.${index}.SmsAllowed`}
                />
              </Stack>
            </Stack>
          </Stack>
        );
      })}
      <Stack direction={"row"}>
        {fields.length < 2 && (
          <Button
            variant="text"
            startIcon={<AddIcon color="primary" />}
            onClick={() => append(defaultPhone)}
          >
            {phoneDictionary.addPhone}
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
