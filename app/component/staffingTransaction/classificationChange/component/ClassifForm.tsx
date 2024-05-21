import { ClassificationChangeType } from "@/app/component/staffingTransaction/classificationChange/ClassificationChangeType";
import { Stack, Typography } from "@mui/material";
import { SelectDataControl } from "@/app/component/staffingTransaction/SelectDataControl";
import { DatePickerComponent } from "@/app/component/createNewProfile/DatePicker";
import { TextAreaComponent } from "@/app/component/TextAreaComponent";
import { Control, FieldErrors } from "react-hook-form";
import { FC } from "react";
import { Dictionary } from "@/dictionaries/dictionaries";
import { useGetDataQuery } from "@/app/redux/features/staffing-transaction/referenceDataApi";

type Props = {
  control: Control<ClassificationChangeType>;
  errors: FieldErrors<ClassificationChangeType>;
  labels: Dictionary["workforce"]["staffingTransaction"]["transactionDetails"]["classificationChange"];
};

export const ClassifForm: FC<Props> = ({ labels, control, errors }) => {
  const { data: departmentRefData, isError: isErrorDepartment } =
    useGetDataQuery("department");
  const { data: employmentStatusRefData, isError: isErrorEmploymentStatus } =
    useGetDataQuery("employmentStatus");
  const { data: jobLevelRefData, isError: isErrorJobLevel } =
    useGetDataQuery("jobLevel");
  const {
    data: employmentClassificationRefData,
    isError: isErrorEmploymentClassification,
  } = useGetDataQuery("employmentClassification");

  if (isErrorDepartment) {
    return <>Error fetching Department Reference Data</>;
  }
  if (isErrorEmploymentStatus) {
    return <>Error fetching EmploymentStatus Reference Data</>;
  }
  if (isErrorJobLevel) {
    return <>Error fetching JobLevel Reference Data</>;
  }
  if (isErrorEmploymentClassification) {
    return <>Error fetching EmploymentClassification Reference Data</>;
  }
  return (
    <Stack gap={3}>
      <Typography variant={"subtitle1"}>
        {labels.newClassificationChange}
      </Typography>
      <SelectDataControl
        required
        control={control}
        errors={errors}
        name={"department"}
        inputLabel={labels.department.label}
        data={departmentRefData?.map((item) => item.name) || []}
      />
      <DatePickerComponent
        required
        disablePast
        control={control}
        label={labels.vacationEntitlementDate.label}
        name={"vacationEntitlementDate"}
      />
      <SelectDataControl
        required
        control={control}
        errors={errors}
        name={"jobLevel"}
        inputLabel={labels.jobLevel.label}
        data={jobLevelRefData?.map((item) => item.name) || []}
      />
      <SelectDataControl
        required
        control={control}
        errors={errors}
        name={"employmentStatus"}
        inputLabel={labels.employmentStatus.label}
        data={employmentStatusRefData?.map((item) => item.name) || []}
      />
      <SelectDataControl
        required
        control={control}
        errors={errors}
        name={"statusClassification"}
        inputLabel={labels.statusClassification.label}
        data={employmentClassificationRefData?.map((item) => item.name) || []}
      />
      <TextAreaComponent
        control={control}
        errors={errors}
        name={"explanation"}
        label={labels.explanation.label}
      />
    </Stack>
  );
};
