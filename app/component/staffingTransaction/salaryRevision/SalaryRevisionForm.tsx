import { FC } from "react";
import { Stack } from "@mui/material";
import { goToSummaryPage } from "@/app/redux/features/staffing-transaction/stfSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { StaffingTransactionProps } from "@/app/[lang]/employee/[id]/staffing-transaction/component/PurposeComponent";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextAreaComponent } from "../../TextAreaComponent";
import BackNextButtons from "../BackNextButtons";
import {
  getSalaryRevisionSchema,
  SalaryRevisionState,
  SalaryRevisionType,
} from "./SalaryRevisionType";
import { SelectDataControl } from "../SelectDataControl";
import { useGetDataQuery } from "@/app/redux/features/staffing-transaction/referenceDataApi";
import { RootState } from "@/app/redux/store";
import { createSelector } from "reselect";

const salaryRevisionSelector = createSelector(
  (state: RootState) => state.employment.employment?.employmentDetails,
  (state: RootState) =>
    state.staffingTransaction.transactionPurposePage.employmentDetailId,
  (state: RootState) =>
    state.staffingTransaction.transactionDetails as SalaryRevisionState,
  (employmentDetails, employmentDetailId, transactionDetails) => {
    const jobLevel = employmentDetails?.find(
      (item) => item.employmentDetailId === employmentDetailId
    )?.catsaJobLevel;
    return {
      transactionDetails,
      jobLevel,
    };
  }
);

export const SalaryRevisionForm: FC<StaffingTransactionProps> = ({
  staffingTransaction,
}) => {
  const dispatch = useAppDispatch();

  const { data: jobLevelRefData, isLoading } = useGetDataQuery("jobLevel");

  const { transactionDetails: defaultValues, jobLevel } = useAppSelector(
    salaryRevisionSelector
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SalaryRevisionType>({
    mode: "onBlur",
    resolver: zodResolver(
      getSalaryRevisionSchema(
        staffingTransaction.transactionDetails.salaryRevision
      )
    ),
    defaultValues: {
      ...defaultValues,
      currentCatsaJobLevel: jobLevel,
    },
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  const jobLevels = jobLevelRefData?.map((item) => item.name) || [];

  return (
    <>
      <Stack gap={3}>
        <SelectDataControl
          required
          isDisabled={true}
          control={control}
          errors={errors}
          name={"currentCatsaJobLevel"}
          inputLabel={
            staffingTransaction.transactionDetails.salaryRevision
              .current_catsa_job_level.label
          }
          data={jobLevels}
        />
        <SelectDataControl
          required
          control={control}
          errors={errors}
          name={"newCatsaJobLevel"}
          inputLabel={
            staffingTransaction.transactionDetails.salaryRevision
              .new_catsa_job_level.label
          }
          data={jobLevels}
        />

        <TextAreaComponent
          control={control}
          name="explanation"
          label={
            staffingTransaction.transactionDetails.salaryRevision.explanation
              .label
          }
          errors={errors}
        />
      </Stack>
      <BackNextButtons
        buttonLabels={staffingTransaction.button}
        handleNext={handleSubmit(
          (onvalid) =>
            dispatch(
              goToSummaryPage({
                ...onvalid,
              })
            ),
          (formError) => console.log(formError)
        )}
      />
    </>
  );
};
