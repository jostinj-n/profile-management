import { Divider, Stack } from "@mui/material";
import React, { FC, useEffect } from "react";
import { Control, FieldErrors, useFieldArray } from "react-hook-form";
import { EighthPageDictionnary } from "@/dictionaries/dictionaries";
import { fetchReferenceTableData } from "@/app/redux/features/newProfileReferenceData";
import { useAppDispatch } from "@/app/redux/hooks";
import { SenioritySchemaType } from "@/app/[lang]/workforce/profile-update/seniority/zodSchema/senioritySchema";
import { DatePickerComponent } from "@/app/component/createNewProfile/DatePicker";
import { TextFieldComponent } from "@/app/component/createNewProfile/TextFieldComponent";
import { InputBooleanField } from "@/app/component/profileUpdate/InputBooleanField";

type Props = {
  seniorityDictionary: EighthPageDictionnary["section"]["seniorityDetails"];
  control: Control<SenioritySchemaType>;
  errors: FieldErrors<SenioritySchemaType>;
};

export const Seniority: FC<Props> = ({
  seniorityDictionary,
  control,
  errors,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchReferenceTableData());
  }, [dispatch]);

  const { fields } = useFieldArray({
    name: "seniority",
    control,
  });
  return (
    <Stack>
      {fields.map((field, index) => {
        return (
          <Stack key={field.id} gap={0.5}>
            {index !== 0 && ( // Assuming you don't want to delete the first address
              <Divider sx={{ marginBottom: "1.2rem" }} />
            )}
            <DatePickerComponent
              size={"small"}
              control={control}
              label={seniorityDictionary.seniorityDate}
              name={`seniority.${index}.seniorityDate`}
            />
            <TextFieldComponent
              size={"small"}
              control={control}
              name={`seniority.${index}.seniorityDateTypeTiebreaker`}
              label={seniorityDictionary.workLocationTiebreaker}
              errors={errors.seniority?.[index]?.seniorityDateTypeTiebreaker}
              required
            />
            <InputBooleanField
              control={control}
              label={seniorityDictionary.suppress}
              name={`seniority.${index}.suppressSeniorityFlag`}
            />
            <TextFieldComponent
              size={"small"}
              control={control}
              name={`seniority.${index}.notes`}
              label={seniorityDictionary.notes}
              errors={errors.seniority?.[index]?.notes}
            />
          </Stack>
        );
      })}
    </Stack>
  );
};
