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
  governmentIDsDictionary: SecondPageDictionnary["section"]["governmentID"];
  control: Control<GovernmentSectionType>;
  errors: FieldErrors<GovernmentSectionType>;
  data: Option[];
};

export const GovernmentIDsUpdate: FC<Props> = ({
  governmentIDsDictionary,
  control,
  errors,
  data,
}) => {
  const maximumGovernmentIDAppend = 5;

  const governmentID = {
    personId: 0,
    typeOfId: "",
    issuedByAgency: "",
    issuedValue: "",
    expiryDate: dayjs(),
  };
  const { fields, append, remove } = useFieldArray({
    name: "governmentIDs",
    control,
  });
  return (
    <Stack>
      <Typography variant="h6">{governmentIDsDictionary.label}</Typography>
      {fields.map((field, index) => (
        <Stack key={field.id}>
          <Stack gap={3} direction={"row"}>
            <SelectFormControl
              control={control}
              errors={errors.governmentIDs?.[index]?.typeOfId}
              name={`governmentIDs.${index}.typeOfId`}
              values={data}
              inputLabel={governmentIDsDictionary.typeOfId}
              tableName="ref_id_type"
              required
              size={"small"}
            />
            <Stack direction={"row"} alignItems={"start"}>
              <SelectFormControl
                control={control}
                errors={errors.governmentIDs?.[index]?.issuedByAgency}
                name={`governmentIDs.${index}.issuedByAgency`}
                values={data}
                inputLabel={governmentIDsDictionary.issuedByAgency}
                tableName="ref_id_issuing_agency"
                required
                size={"small"}
              />
              {index !== 0 && ( // Assuming you don't want to delete the first names
                <IconButton
                  color={"primary"}
                  onClick={() => remove(index)}
                  size="large"
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Stack>
          </Stack>
          <Stack gap={3} direction={"row"}>
            <TextFieldComponent
              control={control}
              name={`governmentIDs.${index}.issuedValue`}
              label={governmentIDsDictionary.issuedValue}
              errors={errors.governmentIDs?.[index]?.issuedValue}
              size={"small"}
            />
            <DatePickerComponent
              control={control}
              label={governmentIDsDictionary.expiryDate}
              name={`governmentIDs.${index}.expiryDate`}
              size={"small"}
            />
          </Stack>
        </Stack>
      ))}
      <Stack direction={"row"}>
        {fields.length < maximumGovernmentIDAppend && (
          <Button
            variant="text"
            startIcon={<AddIcon color="primary" fontSize="medium" />}
            onClick={() => append(governmentID)}
          >
            {governmentIDsDictionary.addGovernmentId}
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
