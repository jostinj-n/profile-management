"use client";
import { Button, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { Dictionary } from "@/dictionaries/dictionaries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Title from "@/app/component/title";
import { TextFieldComponent } from "@/app/component/TextFieldComponent";

import { SelectRefDataFormControl } from "@/app/component/seniority/edit-grouping/component/SelectRefDataFormControl";
import { CheckboxField } from "@/app/component/seniority/edit-grouping/component/CheckBoxField";
import {
  GroupingZodType,
  groupingZodTypeToGroupingRow,
} from "@/app/[lang]/workforce/seniority/create-grouping/types/groupingType";
import { getGroupingSchema } from "@/app/[lang]/workforce/seniority/create-grouping/schemas/groupingSchema";
import { useRouter } from "next/navigation";
import { GroupingDeleteDialog } from "../../delete/GroupingDeleteDialog";
import { SelectMultiDataCheckBoxFormControl } from "../SelectMultiDataCheckBoxFormControl";

type Props = {
  seniority: Dictionary["workforce"]["seniority"];
  initialValue: GroupingZodType;
  idGrouping: number;
  action: string;
  handleSubmitToAPI: (groupingZodType: GroupingZodType) => void;
};

export const AddEditGrouping: FC<Props> = ({
  seniority,
  initialValue,
  idGrouping,
  action,
  handleSubmitToAPI,
}) => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GroupingZodType>({
    mode: "onBlur",
    resolver: zodResolver(getGroupingSchema(seniority.groupingForms.field)),
    defaultValues: {
      ...initialValue,
    },
  });
  const back = () => {
    router.back();
  };

  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Stack paddingTop={3} justifyContent="flex-start">
          <Title
            title={
              action === "add"
                ? seniority.groupingForms.labelCreate
                : seniority.groupingForms.labelUpdate
            }
          />
        </Stack>
        {action === "edit" && (
          <Stack paddingTop={3} justifyContent="flex-end">
            <GroupingDeleteDialog
              hiddenMenu={back}
              seniority={seniority}
              groupingRow={{
                ...groupingZodTypeToGroupingRow(initialValue),
                templateId: idGrouping,
              }}
            />
          </Stack>
        )}
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Stack paddingTop={3} justifyContent="flex-start">
          <Typography>{seniority.groupingForms.label}</Typography>
        </Stack>
      </Stack>
      <Stack spacing={{ xs: 1, sm: 2 }} paddingTop={2}>
        <TextFieldComponent
          width="612px"
          control={control}
          name="templateName"
          label={seniority.groupingForms.field.groupingName.label}
          errors={errors}
        />

        <Stack direction="row" gap={2}>
          <SelectRefDataFormControl
            control={control}
            errors={errors}
            name="companyId"
            referenceTable="company"
            inputLabel={seniority.groupingForms.field.companyName.label}
          />

          <SelectRefDataFormControl
            control={control}
            errors={errors}
            name="divisionId"
            referenceTable="division"
            inputLabel={seniority.groupingForms.field.companyDivision.label}
          />
        </Stack>
        <Stack direction="row" gap={2}>
          <SelectMultiDataCheckBoxFormControl
            control={control}
            errors={errors}
            name="workLocations"
            referenceTable="worklocation"
            inputLabel={seniority.groupingForms.field.workLocation.label}
          />

          <SelectMultiDataCheckBoxFormControl
            control={control}
            errors={errors}
            name="departments"
            referenceTable="department"
            inputLabel={seniority.groupingForms.field.department.label}
          />
        </Stack>

        <Stack direction="row" gap={2}>
          <SelectMultiDataCheckBoxFormControl
            control={control}
            errors={errors}
            name="organisationRoles"
            referenceTable="organization_role"
            inputLabel={seniority.groupingForms.field.organizationalRole.label}
          />

          <SelectMultiDataCheckBoxFormControl
            control={control}
            errors={errors}
            name="organisationRoleSubtypes"
            referenceTable="organization_role_subtype"
            inputLabel={
              seniority.groupingForms.field.organizationalRoleSubtypes.label
            }
          />
        </Stack>

        <SelectMultiDataCheckBoxFormControl
          control={control}
          errors={errors}
          name="employmentStatus"
          referenceTable="employment_status"
          inputLabel={seniority.groupingForms.field.employmentStatus.label}
        />

        <SelectMultiDataCheckBoxFormControl
          control={control}
          errors={errors}
          name="employmentClassifications"
          referenceTable="status_classification"
          inputLabel={seniority.groupingForms.field.statusClassification.label}
        />

        <SelectRefDataFormControl
          control={control}
          errors={errors}
          name="reportTypeId"
          referenceTable="seniority_date_type"
          inputLabel={seniority.groupingForms.field.reportDateType.label}
        />

        <CheckboxField
          control={control}
          errors={errors}
          name="unionizedEmployeeOnly"
          inputLabel={
            seniority.groupingForms.field.unionizedEmployeesOnly.label
          }
        />

        <CheckboxField
          control={control}
          errors={errors}
          name="includeContactDetails"
          inputLabel={seniority.groupingForms.field.includeContactDetails.label}
        />

        <Stack direction="row" gap={30}>
          <Stack direction="row" gap={10}>
            <Button
              data-testid="continue-first-page"
              variant="contained"
              onClick={handleSubmit((data) => handleSubmitToAPI(data))}
            >
              {action === "add"
                ? seniority.groupingForms.create
                : seniority.groupingForms.update}
            </Button>

            <Button
              variant="text"
              color="secondary"
              onClick={() => router.back()}
            >
              {action === "add"
                ? seniority.groupingForms.cancel
                : seniority.groupingForms.updateCancel}
            </Button>
          </Stack>

          <Button variant="text" color="secondary" onClick={() => reset()}>
            {action === "add" && seniority.groupingForms.reset}
          </Button>
        </Stack>
      </Stack>
    </>
  );
};
