"use client";
import { FourthPageDictionnary } from "@/dictionaries/dictionaries";
import { Button, Divider, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { Control, FieldErrors, useFieldArray } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import { TextFieldComponent } from "@/app/component/createNewProfile/TextFieldComponent";
import { DeleteButton } from "@/app/component/profileUpdate/deleteButton";
import { ContactDetailsType } from "@/app/[lang]/workforce/profile-update/contactDetails/zodSchema/contactDetailsSchema";
import { InputBooleanField } from "@/app/component/profileUpdate/InputBooleanField";

type Props = {
  emailDictionary: FourthPageDictionnary["section"]["email"];
  control: Control<ContactDetailsType>;
  errors: FieldErrors<ContactDetailsType>;
};
const defaultEmail = {
  personalEmailAddress: "",
  primaryEmailAddress: false,
  emailGeneralCorrespondence: false,
};

export const Email: FC<Props> = ({ emailDictionary, control, errors }) => {
  const { fields, append, remove } = useFieldArray({
    name: "emails",
    control,
  });
  return (
    <Stack gap={1.5}>
      <Typography variant="body1">{emailDictionary.label}</Typography>
      {fields.map((field, index) => {
        return (
          <>
            {index !== 0 && ( // Assuming you don't want to delete the first address
              <Divider />
            )}
            <Stack>
              <Stack direction={"row"} alignItems={"start"}>
                <TextFieldComponent
                  control={control}
                  name={`emails.${index}.personalEmailAddress`}
                  label={emailDictionary.personalEmail}
                  errors={errors.emails?.[index]?.personalEmailAddress}
                  required
                  size={"small"}
                />
                {index !== 0 && ( // Assuming you don't want to delete the first names
                  <DeleteButton remove={remove} index={index} />
                )}
              </Stack>
              <Stack direction={"row"}>
                <InputBooleanField
                  control={control}
                  label={emailDictionary.checkbox.primaryEmail}
                  name={`emails.${index}.primaryEmailAddress`}
                />
                <InputBooleanField
                  control={control}
                  label={emailDictionary.checkbox.generalCorrespondenceAllowed}
                  name={`emails.${index}.emailGeneralCorrespondence`}
                />
              </Stack>
            </Stack>
          </>
        );
      })}
      <Stack direction={"row"}>
        {fields.length < 2 && (
          <Button
            variant="text"
            startIcon={<AddIcon color="primary" />}
            onClick={() => append(defaultEmail)}
          >
            {emailDictionary.addEmail}
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
