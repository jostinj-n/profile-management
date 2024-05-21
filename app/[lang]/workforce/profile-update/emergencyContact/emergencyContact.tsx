import React, { FC } from "react";
import {
  FifthPageDictionnary,
  FourthPageDictionnary,
} from "@/dictionaries/dictionaries";
import { useAppSelector } from "@/app/redux/hooks";
import { Control, FieldErrors, useFieldArray } from "react-hook-form";
import { Button, Stack } from "@mui/material";
import EmergencyProfile from "./components/emergencyProfile";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Phone } from "@/app/[lang]/workforce/profile-update/emergencyContact/components/phone";
import { Email } from "@/app/[lang]/workforce/profile-update/emergencyContact/components/email";
import { ContactDetailsType } from "@/app/[lang]/workforce/profile-update/contactDetails/zodSchema/contactDetailsSchema";

type Props = {
  emergencyDictionary: FifthPageDictionnary;
  contactDetailsDictionary: FourthPageDictionnary;
  control: Control<ContactDetailsType>;
  errors: FieldErrors<ContactDetailsType>;
};

const defaultEmergencyContact = {
  primaryContact: false,
  relationship: "",
  pronoun: "",
  firstName: "",
  lastName: "",
  preferredLanguage: "",
  proficiency: "",
  phones: [
    {
      phoneNumber: "",
      personalDeviceTye: "",
      primaryNumber: false,
      SmsAllowed: false,
    },
  ],
  email: "",
  notes: "",
};
export const EmergencyContact: FC<Props> = ({
  emergencyDictionary,
  contactDetailsDictionary,
  control,
  errors,
}) => {
  const { data } = useAppSelector(
    (state) => state.newProfileRefData.referenceTableData,
  );

  const { fields, append, remove } = useFieldArray({
    name: "emergencyContacts",
    control,
  });
  return (
    <Stack>
      <Stack gap={3}>
        {fields.map((field, index) => {
          return (
            <>
              <Stack direction={"row"}>
                <EmergencyProfile
                  indexEmergencyContacts={index}
                  control={control}
                  errors={errors}
                  emergencyProfile={
                    emergencyDictionary.section.emergencyProfile
                  }
                  data={data}
                />
                {index !== 0 && ( // Assuming you don't want to delete the first names
                  <Button
                    startIcon={<DeleteIcon />}
                    onClick={() => remove(index)}
                    size="large"
                  ></Button>
                )}
              </Stack>
              <Phone
                phoneIndex={index}
                phoneDictionary={contactDetailsDictionary.section.phone}
                control={control}
                errors={errors}
                data={data}
              />
              <Email
                emailIndex={index}
                emailDictionary={contactDetailsDictionary.section.email}
                control={control}
                errors={errors}
                data={data}
              />
            </>
          );
        })}

        {fields.length < 5 && (
          <Button
            variant="text"
            startIcon={<AddIcon color="primary" fontSize="medium" />}
            onClick={() => append(defaultEmergencyContact)}
          >
            {emergencyDictionary.section.emergencyProfile.add}
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
