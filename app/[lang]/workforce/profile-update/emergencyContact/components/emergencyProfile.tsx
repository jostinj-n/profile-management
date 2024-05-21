import React, { FC } from "react";
import { Stack, Typography } from "@mui/material";
import { FifthPageDictionnary } from "@/dictionaries/dictionaries";
import { Control, FieldErrors } from "react-hook-form";
import { SelectFormControl } from "@/app/component/createNewProfile/SelectFormControl";
import { TextFieldComponent } from "@/app/component/createNewProfile/TextFieldComponent";
import { Option } from "@/app/[lang]/workforce/profile-update/types/referenceData";
import { InputBooleanField } from "@/app/component/profileUpdate/InputBooleanField";
import { ContactDetailsType } from "@/app/[lang]/workforce/profile-update/contactDetails/zodSchema/contactDetailsSchema";

type Props = {
  indexEmergencyContacts: number;
  emergencyProfile: FifthPageDictionnary["section"]["emergencyProfile"];
  control: Control<ContactDetailsType>;
  errors: FieldErrors<ContactDetailsType>;
  data: Option[];
};

export const EmergencyProfile: FC<Props> = ({
  indexEmergencyContacts,
  emergencyProfile,
  control,
  errors,
  data,
}) => {
  return (
    <Stack gap={1.5}>
      <Typography variant="body1">{emergencyProfile.label}</Typography>
      <Stack>
        <Stack direction={"row"} gap={3}>
          <SelectFormControl
            control={control}
            name={`emergencyContacts.${indexEmergencyContacts}.relationship`}
            errors={
              errors.emergencyContacts?.[indexEmergencyContacts]?.relationship
            }
            values={data}
            inputLabel={emergencyProfile.relationship}
            tableName="ref_relationship"
            size={"small"}
          />
          <SelectFormControl
            control={control}
            errors={errors.emergencyContacts?.[indexEmergencyContacts]?.pronoun}
            name={`emergencyContacts.${indexEmergencyContacts}.pronoun`}
            values={data}
            inputLabel={emergencyProfile.pronoun}
            tableName="ref_personal_pronoun"
            size={"small"}
          />
          <InputBooleanField
            control={control}
            label={emergencyProfile.primary}
            name={`emergencyContacts.${indexEmergencyContacts}.primaryContact`}
          />
        </Stack>
        <Stack direction={"row"} gap={3}>
          <TextFieldComponent
            control={control}
            name={`emergencyContacts.${indexEmergencyContacts}.firstName`}
            required
            label={emergencyProfile.firstName}
            errors={
              errors.emergencyContacts?.[indexEmergencyContacts]?.firstName
            }
            size={"small"}
          />
          <TextFieldComponent
            control={control}
            name={`emergencyContacts.${indexEmergencyContacts}.lastName`}
            required
            label={emergencyProfile.lastName}
            errors={
              errors.emergencyContacts?.[indexEmergencyContacts]?.lastName
            }
            size={"small"}
          />
        </Stack>
        <Stack direction={"row"} gap={3}>
          <SelectFormControl
            control={control}
            errors={
              errors.emergencyContacts?.[indexEmergencyContacts]
                ?.preferredLanguage
            }
            name={`emergencyContacts.${indexEmergencyContacts}.preferredLanguage`}
            values={data}
            inputLabel={emergencyProfile.preferredLanguage}
            tableName="ref_language"
            size={"small"}
          />
          <SelectFormControl
            control={control}
            errors={
              errors.emergencyContacts?.[indexEmergencyContacts]?.proficiency
            }
            name={`emergencyContacts.${indexEmergencyContacts}.proficiency`}
            values={data}
            inputLabel={emergencyProfile.proficiency}
            tableName="ref_language_proficiency"
            size={"small"}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default EmergencyProfile;
