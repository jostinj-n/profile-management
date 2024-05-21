"use client";
import { FourthPageDictionnary } from "@/dictionaries/dictionaries";
import { Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { Control, FieldErrors } from "react-hook-form";
import { TextFieldComponent } from "@/app/component/createNewProfile/TextFieldComponent";
import { Option } from "@/app/[lang]/workforce/profile-update/types/referenceData";
import { ContactDetailsType } from "@/app/[lang]/workforce/profile-update/contactDetails/zodSchema/contactDetailsSchema";

type Props = {
  emailIndex: number;
  emailDictionary: FourthPageDictionnary["section"]["email"];
  control: Control<ContactDetailsType>;
  errors: FieldErrors<ContactDetailsType>;
  data: Option[];
};
export const Email: FC<Props> = ({
  emailDictionary,
  control,
  errors,
  emailIndex,
}) => {
  return (
    <Stack gap={1.5}>
      <Typography variant="body1">{emailDictionary.label}</Typography>
      <Stack direction={"row"} alignItems={"start"}>
        <TextFieldComponent
          control={control}
          name={`emergencyContacts.${emailIndex}.email`}
          label={emailDictionary.personalEmail}
          errors={errors.emergencyContacts?.[emailIndex]?.email}
          required
          size={"small"}
        />
      </Stack>
    </Stack>
  );
};
