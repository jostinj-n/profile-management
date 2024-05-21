import React, { FC } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import { FifthPageDictionnary } from "@/dictionaries/dictionaries";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { FifthPageType } from "../fifthPage";
import { SelectFormControl } from "@/app/component/createNewProfile/SelectFormControl";
import { TextFieldComponent } from "@/app/component/createNewProfile/TextFieldComponent";

type Props = {
  indexEmergencyContacts: number;
  emergencyProfile: FifthPageDictionnary["section"]["emergencyProfile"];
  control: Control<FifthPageType>;
  errors: FieldErrors<FifthPageType>;
  data: [];
};

export const EmergencyProfile: FC<Props> = ({
  indexEmergencyContacts,
  emergencyProfile,
  control,
  errors,
  data,
}) => {
  return (
    <Stack>
      <Typography variant="h6">{emergencyProfile.label}</Typography>
      <Stack gap={3}>
        <Stack direction={"row"} gap={3}>
          <SelectFormControl
            control={control}
            errors={errors[indexEmergencyContacts]?.relationship}
            name={`${indexEmergencyContacts}.relationship`}
            values={data}
            inputLabel={emergencyProfile.relationship}
            tableName="ref_relationship"
          />
          <SelectFormControl
            control={control}
            errors={errors[indexEmergencyContacts]?.pronoun}
            name={`${indexEmergencyContacts}.pronoun`}
            values={data}
            inputLabel={emergencyProfile.pronoun}
            tableName="ref_personal_pronoun"
          />

          <Controller
            control={control}
            name={`${indexEmergencyContacts}.primaryContact`}
            render={({ field }) => (
              <FormControl component="fieldset">
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label={emergencyProfile.primary}
                  />
                </FormGroup>
              </FormControl>
            )}
          />
        </Stack>
        <Stack direction={"row"} gap={3}>
          <TextFieldComponent
            control={control}
            name={`${indexEmergencyContacts}.firstName`}
            required
            label={emergencyProfile.firstName}
            errors={errors[indexEmergencyContacts]?.firstName}
          />
          <TextFieldComponent
            control={control}
            name={`${indexEmergencyContacts}.lastName`}
            required
            label={emergencyProfile.lastName}
            errors={errors[indexEmergencyContacts]?.lastName}
          />
        </Stack>
        <Stack direction={"row"} gap={3}>
          <SelectFormControl
            control={control}
            errors={errors[indexEmergencyContacts]?.preferredLanguage}
            name={`${indexEmergencyContacts}.preferredLanguage`}
            values={data}
            inputLabel={emergencyProfile.preferredLanguage}
            tableName="ref_language"
          />
          <SelectFormControl
            control={control}
            errors={errors[indexEmergencyContacts]?.proficiency}
            name={`${indexEmergencyContacts}.proficiency`}
            values={data}
            inputLabel={emergencyProfile.proficiency}
            tableName="ref_language_proficiency"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default EmergencyProfile;
