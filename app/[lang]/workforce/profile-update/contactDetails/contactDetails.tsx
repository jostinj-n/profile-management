import { Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { Control, FieldErrors } from "react-hook-form";
import React, { FC, useEffect } from "react";
import { fetchReferenceTableData } from "@/app/redux/features/newProfileReferenceData";
import {
  ButtonLabels,
  FifthPageDictionnary,
  FourthPageDictionnary,
} from "@/dictionaries/dictionaries";
import { Phone } from "@/app/[lang]/workforce/profile-update/contactDetails/components/phone";

import { Email } from "@/app/[lang]/workforce/profile-update/contactDetails/components/email";
import { Address } from "@/app/[lang]/workforce/profile-update/contactDetails/components/address";
import { EmergencyContact } from "@/app/[lang]/workforce/profile-update/emergencyContact/emergencyContact";
import { ContactDetailsType } from "@/app/[lang]/workforce/profile-update/contactDetails/zodSchema/contactDetailsSchema";

type Props = {
  contactDetailsDictionary: FourthPageDictionnary;
  emergencyDictionary: FifthPageDictionnary;
  button: ButtonLabels;
  control: Control<ContactDetailsType>;
  errors: FieldErrors<ContactDetailsType>;
};

export const ContactDetails: FC<Props> = ({
  contactDetailsDictionary,
  emergencyDictionary,
  control,
  errors,
}) => {
  const dispatch = useAppDispatch();

  const { data } = useAppSelector(
    (state) => state.newProfileRefData.referenceTableData,
  );

  useEffect(() => {
    dispatch(fetchReferenceTableData());
  }, [dispatch]);
  return (
    <Stack>
      <Phone
        phoneDictionary={contactDetailsDictionary.section.phone}
        control={control}
        errors={errors}
        data={data}
      />
      <Email
        emailDictionary={contactDetailsDictionary.section.email}
        control={control}
        errors={errors}
      />
      <Address
        addressDictionary={contactDetailsDictionary.section.address}
        control={control}
        errors={errors}
        data={data}
      />
      <EmergencyContact
        control={control}
        errors={errors}
        emergencyDictionary={emergencyDictionary}
        contactDetailsDictionary={contactDetailsDictionary}
      />
    </Stack>
  );
};
