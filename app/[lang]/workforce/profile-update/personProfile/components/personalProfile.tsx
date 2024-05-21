import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { TextFieldComponent } from "@/app/component/createNewProfile/TextFieldComponent";
import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
} from "react-hook-form";
import { FirstPageDictionary } from "@/dictionaries/dictionaries";
import { SelectFormControl } from "@/app/component/createNewProfile/SelectFormControl";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { PersonProfileType } from "@/app/[lang]/workforce/profile-update/personProfile/zodSchema/personProfileSchema";
import { Option } from "@/app/[lang]/workforce/profile-update/types/referenceData";
import { DatePickerComponent } from "@/app/component/createNewProfile/DatePicker";

type Props = {
  personProfileDictionnary: FirstPageDictionary["section"]["personalDetails"];
  control: Control<PersonProfileType>;
  errors: FieldErrors<PersonProfileType>;
  data: Option[];
};

export const PersonProfileSection: FC<Props> = ({
  personProfileDictionnary,
  control,
  errors,
  data,
}) => {
  const { fields, append, remove } = useFieldArray({
    name: "personalDetails",
    control,
  });
  return (
    <>
      <Typography variant="body1" pb={"1rem"}>
        {personProfileDictionnary.profileUpdateLabel}
      </Typography>
      <Stack gap={3}>
        <Stack>
          <SelectFormControl
            size={"small"}
            control={control}
            errors={errors.resourceType}
            name="resourceType"
            values={data}
            tableName="ref_resource_type"
            inputLabel={personProfileDictionnary.resourceType}
            required
          />
          {fields.map((field, index) => {
            return (
              <Stack key={field.id} gap={0.5}>
                {index !== 0 && ( // Assuming you don't want to delete the first address
                  <Divider sx={{ marginBottom: "1.2rem" }} />
                )}
                <Stack direction={"row"} gap={3}>
                  <Box>
                    <TextFieldComponent
                      size={"small"}
                      control={control}
                      name={`personalDetails.${index}.legalFirstName`}
                      label={personProfileDictionnary.firstName}
                      errors={errors.personalDetails?.[index]?.legalFirstName}
                      required
                    />
                  </Box>
                  <Stack direction={"row"} gap={3} alignItems={"start"}>
                    <Box>
                      <TextFieldComponent
                        size={"small"}
                        control={control}
                        name={`personalDetails.${index}.legalLastName`}
                        label={personProfileDictionnary.lastName}
                        errors={errors.personalDetails?.[index]?.legalLastName}
                        required
                      />
                    </Box>
                    {index !== 0 && ( // Assuming you don't want to delete the first names
                      <Button
                        startIcon={<DeleteIcon />}
                        onClick={() => remove(index)}
                        size="large"
                      ></Button>
                    )}
                  </Stack>
                </Stack>
                {index == 0 && ( // Assuming you don't want to render middle name and preferred name more than once
                  <Stack direction={"row"} gap={3}>
                    <Box>
                      <TextFieldComponent
                        size={"small"}
                        control={control}
                        name={`middleName`}
                        label={personProfileDictionnary.middleName}
                        errors={errors.middleName}
                      />
                    </Box>
                    <Box>
                      <TextFieldComponent
                        size={"small"}
                        control={control}
                        name={`preferredName`}
                        label={personProfileDictionnary.preferredName}
                        errors={errors.preferredName}
                      />
                    </Box>
                  </Stack>
                )}
              </Stack>
            );
          })}
          <Stack direction={"row"}>
            {fields.length < 2 && (
              <Button
                variant="text"
                startIcon={<AddIcon color="primary" fontSize="medium" />} // Place AddIcon at the beginning
                onClick={() =>
                  append({
                    legalFirstName: "",
                    legalLastName: "",
                  })
                }
              >
                {personProfileDictionnary.addFormerLegalName}
              </Button>
            )}
          </Stack>
        </Stack>
        <Stack gap={1}>
          <DatePickerComponent
            size={"small"}
            control={control}
            label={personProfileDictionnary.dateOfBirth}
            name="dateOfBirth"
          />
          <Stack direction={"row"} columnGap={3}>
            <SelectFormControl
              size={"small"}
              control={control}
              errors={errors.gender}
              name="gender"
              values={data}
              tableName="ref_gender"
              inputLabel={personProfileDictionnary.gender}
              required
            />
            <SelectFormControl
              size={"small"}
              control={control}
              errors={errors.personalPronoun}
              name="personalPronoun"
              tableName="ref_personal_pronoun"
              values={data}
              inputLabel={personProfileDictionnary.pronoun}
            />
          </Stack>
          <SelectFormControl
            size={"small"}
            control={control}
            errors={errors.primaryCommunicationLanguage}
            name="primaryCommunicationLanguage"
            values={data}
            tableName="ref_language"
            inputLabel={personProfileDictionnary.primaryCommunicationLanguage}
            required
          />
          <SelectFormControl
            size={"small"}
            control={control}
            errors={errors.species}
            name="species"
            values={data}
            tableName="ref_species"
            inputLabel={personProfileDictionnary.species}
          />
          <Stack width={"30%"}>
            <Controller
              control={control}
              name="notes"
              render={({ field }) => (
                <TextField
                  rows={4}
                  multiline
                  label={personProfileDictionnary.notes}
                  placeholder={personProfileDictionnary.notes}
                  helperText={errors.notes?.message}
                  inputRef={field.ref}
                  error={!!errors.notes}
                  {...field}
                />
              )}
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
