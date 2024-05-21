"use client";
import { FourthPageDictionnary } from "@/dictionaries/dictionaries";
import { Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { Control, FieldErrors } from "react-hook-form";
import { TextFieldComponent } from "@/app/component/createNewProfile/TextFieldComponent";
import { Option } from "@/app/[lang]/workforce/profile-update/types/referenceData";
import { ContactDetailsType } from "@/app/[lang]/workforce/profile-update/contactDetails/zodSchema/contactDetailsSchema";
import { InputBooleanField } from "@/app/component/profileUpdate/InputBooleanField";

type Props = {
  addressDictionary: FourthPageDictionnary["section"]["address"];
  control: Control<ContactDetailsType>;
  errors: FieldErrors<ContactDetailsType>;
  data: Option[];
};

export const Address: FC<Props> = ({ addressDictionary, control, errors }) => {
  return (
    <Stack gap={1.5}>
      <Typography variant="body1">{addressDictionary.label}</Typography>
      <Stack>
        <TextFieldComponent
          control={control}
          name={"residentialAddress"}
          label={addressDictionary.address}
          errors={errors.residentialAddress}
          required
          size={"small"}
        />
        <Stack>
          <InputBooleanField
            control={control}
            label={addressDictionary.chechbox.sameMailingAddress}
            name={`sameMailingAddress`}
          />
        </Stack>
      </Stack>
      <TextFieldComponent
        control={control}
        name={"mailingAddress"}
        label={addressDictionary.mailingAddress}
        errors={errors.mailingAddress}
        required
        size={"small"}
      />
    </Stack>
  );
};
