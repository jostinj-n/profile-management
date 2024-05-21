"use client";
import { SecondPageDictionnary } from "@/dictionaries/dictionaries";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { Control, FieldErrors, useFieldArray } from "react-hook-form";
import { TextFieldComponent } from "@/app/component/createNewProfile/TextFieldComponent";
import { SelectFormControl } from "@/app/component/createNewProfile/SelectFormControl";
import { DatePickerComponent } from "@/app/component/createNewProfile/DatePicker";
import { Option } from "@/app/[lang]/workforce/profile-update/types/referenceData";
import { GovernmentSectionType } from "@/app/[lang]/workforce/profile-update/governmentIDs/zodSchema/governmentSchema";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  citizenStatusDictionary: SecondPageDictionnary["section"]["citizenStatus"];
  control: Control<GovernmentSectionType>;
  errors: FieldErrors<GovernmentSectionType>;
  data: Option[];
};

export const CitizenStatusUpdate: FC<Props> = ({
  citizenStatusDictionary,
  control,
  errors,
  data,
}) => {
  const maximumCitizenIDAppend = 5;

  const citizenID = {
    personId: 0,
    issuingAgency: "",
    citizenStatusIdType: "",
    citizenStatusIdNumber: "",
    citizenStatusEffectiveFrom: dayjs(),
    citizenStatusEffectiveTo: dayjs(),
  };
  const { fields, append, remove } = useFieldArray({
    name: "citizenStatusIDs",
    control,
  });
  return (
    <Stack>
      <Typography variant="h6">{citizenStatusDictionary.label}</Typography>
      <Stack direction={"row"} gap={3}>
        <SelectFormControl
          control={control}
          errors={errors.citizenStatus}
          name={`citizenStatus`}
          values={data}
          inputLabel={citizenStatusDictionary.status}
          tableName="ref_citizen_status"
          required
          size={"small"}
        />
        <SelectFormControl
          control={control}
          errors={errors.citizenStatusCountry}
          name={`citizenStatusCountry`}
          values={data}
          inputLabel={citizenStatusDictionary.citizenCountry}
          tableName="ref_country"
          required
          size={"small"}
        />
      </Stack>
      {fields.map((field, index) => (
        <Stack key={field.id} direction={"row"} gap={3}>
          <Stack>
            <SelectFormControl
              control={control}
              errors={errors.citizenStatusIDs?.[index]?.issuingAgency}
              name={`citizenStatusIDs.${index}.issuingAgency`}
              values={data}
              inputLabel={citizenStatusDictionary.issuing}
              tableName="ref_id_issuing_agency"
              required
              size={"small"}
            />
            <SelectFormControl
              control={control}
              errors={errors.citizenStatusIDs?.[index]?.citizenStatusIdType}
              name={`citizenStatusIDs.${index}.citizenStatusIdType`}
              values={data}
              inputLabel={citizenStatusDictionary.statusIdType}
              tableName="ref_id_type"
              required
              size={"small"}
            />
            <DatePickerComponent
              control={control}
              label={citizenStatusDictionary.effectiveFrom}
              name={`citizenStatusIDs.${index}.citizenStatusEffectiveFrom`}
              size={"small"}
            />
          </Stack>
          <Stack>
            <Stack direction={"row"}>
              <TextFieldComponent
                control={control}
                required
                name={`citizenStatusIDs.${index}.citizenStatusIdNumber`}
                label={citizenStatusDictionary.idValue}
                errors={errors.citizenStatusIDs?.[index]?.citizenStatusIdNumber}
                size={"small"}
              />
              <Stack direction={"row"}>
                {index !== 0 && ( // Assuming you don't want to delete the first names
                  <IconButton
                    sx={{ alignSelf: "start" }}
                    color={"primary"}
                    onClick={() => remove(index)}
                    size="large"
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Stack>
            </Stack>
            <Stack>
              <DatePickerComponent
                control={control}
                label={citizenStatusDictionary.effectiveTo}
                name={`citizenStatusIDs.${index}.citizenStatusEffectiveTo`}
                size={"small"}
              />
            </Stack>
          </Stack>
        </Stack>
      ))}
      <Stack direction={"row"}>
        {fields.length < maximumCitizenIDAppend && (
          <Button
            variant="text"
            startIcon={<AddIcon color="primary" fontSize="medium" />}
            onClick={() => append(citizenID)}
          >
            {citizenStatusDictionary.add}
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
