"use client";
import { SecondPageDictionnary } from "@/dictionaries/dictionaries";
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
} from "react-hook-form";
import { TextFieldComponent } from "@/app/component/createNewProfile/TextFieldComponent";
import { SelectFormControl } from "@/app/component/createNewProfile/SelectFormControl";
import { DatePickerComponent } from "@/app/component/createNewProfile/DatePicker";
import { Option } from "@/app/[lang]/workforce/profile-update/types/referenceData";
import { GovernmentSectionType } from "@/app/[lang]/workforce/profile-update/governmentIDs/zodSchema/governmentSchema";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  taxIDsDictionary: SecondPageDictionnary["section"]["taxID"];
  control: Control<GovernmentSectionType>;
  errors: FieldErrors<GovernmentSectionType>;
  data: Option[];
};

export const TaxIDsUpdate: FC<Props> = ({
  taxIDsDictionary,
  control,
  errors,
  data,
}) => {
  const maximumTaxIDAppend = 3;

  const taxID = {
    personId: 0,
    taxIdType: "",
    issuingAgency: "",
    taxIdValue: "",
    taxIdExpiryDateTax: dayjs(),
  };
  const { fields, append, remove } = useFieldArray({
    name: "taxIDs",
    control,
  });

  return (
    <Stack>
      <Typography variant="h6">{taxIDsDictionary.label}</Typography>
      {fields.map((field, index) => (
        <Stack key={field.id}>
          <Stack>
            <Stack direction={"row"} gap={3}>
              <SelectFormControl
                control={control}
                errors={errors.taxIDs?.[index]?.taxIdType}
                name={`taxIDs.${index}.taxIdType`}
                values={data}
                inputLabel={taxIDsDictionary.taxIdType}
                tableName="ref_id_type"
                required
                size={"small"}
              />
              <Stack direction={"row"}>
                <TextFieldComponent
                  control={control}
                  name={`taxIDs.${index}.taxIdValue`}
                  label={taxIDsDictionary.taxIdValue}
                  errors={errors.taxIDs?.[index]?.taxIdValue}
                  required
                  size={"small"}
                />
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
            <Stack direction={"row"} gap={3}>
              <DatePickerComponent
                control={control}
                label={taxIDsDictionary.expiryDateTax}
                name={`taxIDs.${index}.taxIdExpiryDateTax`}
                size={"small"}
              />
              <SelectFormControl
                control={control}
                errors={errors.taxIDs?.[index]?.issuingAgency}
                name={`taxIDs.${index}.issuingAgency`}
                values={data}
                inputLabel={taxIDsDictionary.taxIssuing}
                tableName="ref_id_issuing_agency"
                required
                size={"small"}
              />
            </Stack>
          </Stack>
        </Stack>
      ))}
      <Stack direction={"row"}>
        {fields.length < maximumTaxIDAppend && (
          <Button
            variant="text"
            startIcon={<AddIcon color="primary" fontSize="medium" />}
            onClick={() => append(taxID)}
          >
            {taxIDsDictionary.addTaxId}
          </Button>
        )}
      </Stack>
      <Stack width={"30%"}>
        <Controller
          control={control}
          name="personalDetailsNotes"
          render={({ field }) => (
            <TextField
              rows={4}
              multiline
              label={taxIDsDictionary.notes}
              placeholder={taxIDsDictionary.notes}
              helperText={errors.personalDetailsNotes?.message}
              inputRef={field.ref}
              error={!!errors.personalDetailsNotes}
              {...field}
            />
          )}
        />
      </Stack>
    </Stack>
  );
};
