import { Control, FieldErrors, FieldValues } from "react-hook-form";
import { Stack } from "@mui/material";
import { DatePickerComponent } from "../../createNewProfile/DatePicker";
import { TextAreaComponent } from "../../TextAreaComponent";
import { TextFieldComponent } from "../../TextFieldComponent";
import { RadioComponent } from "../../RadioComponent";

import SelectRefStringDataComponent from "../SelectRefStringDataComponent";
import { Dictionary } from "@/dictionaries/dictionaries";
import { useGetFilterQuery } from "@/app/redux/features/seniority/filtersApi";
import { Fields, MainType } from "./PromoDemoTransType";
import { useEffect } from "react";

type Form<T extends FieldValues> = {
  control: Control<T>;
  errors: FieldErrors<T>;
  fields: Fields<T>;
  mainLabels: Dictionary["workforce"]["staffingTransaction"]["transactionDetails"]["mainPromotionDemotionTransfer"];
  watch: (names?: string | string[]) => unknown;
  setCustomValue: (name: keyof MainType, value: unknown) => void;
};
export const FormComponent = <T extends FieldValues>({
  control,
  errors,
  fields,
  mainLabels,
  watch,
  setCustomValue,
}: Form<T>) => {
  const { data: worklocations } = useGetFilterQuery("worklocation");

  const newWorkLocationCode = watch(fields.newWorkLocationCode);
  const newWorkLocationName = watch(fields.newWorkLocationName);
  const newOrganisationRole = watch(fields.newOrganizationalRole);

  useEffect(() => {
    setCustomValue(
      fields.newWorkLocationName as keyof MainType,
      worklocations?.find((item) => item.code === newWorkLocationCode)?.name ??
        "",
    );
  }, [
    newWorkLocationCode,
    fields.newWorkLocationName,
    worklocations,
    setCustomValue,
  ]);
  useEffect(() => {
    setCustomValue(
      fields.newWorkLocationCode as keyof MainType,
      worklocations?.find((item) => item.name === newWorkLocationName)?.code ??
        "",
    );
  }, [
    newWorkLocationName,
    fields.newWorkLocationCode,
    worklocations,
    setCustomValue,
  ]);
  useEffect(() => {
    setCustomValue(fields.newJobTitle as keyof MainType, newOrganisationRole);
  }, [newOrganisationRole, fields.newJobTitle, setCustomValue]);

  return (
    <>
      <Stack gap={3}>
        <DatePickerComponent
          disablePast
          required
          control={control}
          label={mainLabels.firstDayWorkedInRole.label}
          name={fields.firstDayWorkedInRole}
        />
        <DatePickerComponent
          disablePast
          required
          control={control}
          label={mainLabels.lastDayWorkedInRole.label}
          name={fields.lastDayWorkedInRole}
        />

        <SelectRefStringDataComponent
          required
          control={control}
          errors={errors}
          name={fields.newCompany}
          inputLabel={mainLabels.newCompany.label}
          filterName={"company"}
        />

        <SelectRefStringDataComponent
          required
          control={control}
          errors={errors}
          name={fields.newDivision}
          inputLabel={mainLabels.newDivision.label}
          filterName={"division"}
        />

        <SelectRefStringDataComponent
          required
          control={control}
          errors={errors}
          name={fields.newDepartment}
          inputLabel={mainLabels.newDepartment.label}
          filterName={"department"}
        />

        <SelectRefStringDataComponent
          required
          control={control}
          errors={errors}
          name={fields.newWorkLocationCode}
          field="code"
          inputLabel={mainLabels.newWorkLocationCode.label}
          filterName={"worklocation"}
        />

        <SelectRefStringDataComponent
          required
          control={control}
          errors={errors}
          name={fields.newWorkLocationName}
          inputLabel={mainLabels.newWorkLocationName.label}
          filterName={"worklocation"}
        />

        <SelectRefStringDataComponent
          required
          control={control}
          errors={errors}
          name={fields.newOrganizationalRole}
          inputLabel={mainLabels.newOrganizationalRole.label}
          filterName={"organization_role"}
        />

        <SelectRefStringDataComponent
          required
          control={control}
          errors={errors}
          name={fields.newOrganizationalRoleSubtype}
          inputLabel={mainLabels.newOrganizationalRoleSubtype.label}
          filterName={"organization_role_subtype"}
        />

        <TextFieldComponent
          control={control}
          name={fields.newJobTitle}
          label={mainLabels.newJobTitle.label}
          errors={errors}
        />

        <SelectRefStringDataComponent
          control={control}
          errors={errors}
          name={fields.newCatsaJobLevel}
          inputLabel={mainLabels.newCatsaJobLevel.label}
          filterName={"ref_catsa_job_level"}
        />

        <SelectRefStringDataComponent
          required
          control={control}
          errors={errors}
          name={fields.newEmploymentClassification}
          inputLabel={mainLabels.newEmploymentClassification.label}
          filterName={"status_classification"}
        />

        <SelectRefStringDataComponent
          required
          control={control}
          errors={errors}
          name={fields.employmentStatus}
          inputLabel={mainLabels.employmentStatus.label}
          filterName={"employment_status"}
        />
        <RadioComponent
          control={control}
          required
          name={fields.isNewPositionUnionized}
          label={mainLabels.isNewPositionUnionized.label}
          values={["Yes", "No"]}
        />
        <TextAreaComponent
          control={control}
          name={fields.explanation}
          label={mainLabels.explanation.label}
          errors={errors}
        />
      </Stack>
    </>
  );
};
