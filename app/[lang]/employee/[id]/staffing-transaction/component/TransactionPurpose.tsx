import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { Stack } from "@mui/material";
import { goToTransactionDetailsPage } from "@/app/redux/features/staffing-transaction/stfSlice";
import dayjs from "dayjs";
import { DatePickerComponent } from "@/app/component/createNewProfile/DatePicker";
import { TextFieldComponent } from "@/app/component/TextFieldComponent";
import { EmploymentRecordForm } from "@/app/component/staffingTransaction/EmploymentRecord";
import BackNextButtons from "@/app/component/staffingTransaction/BackNextButtons";
import { Dictionary } from "@/dictionaries/dictionaries";
import {
  getPurposeSchema,
  TransactionPurposeSchema,
} from "./TransactionPurposeSchema";
import { Employment } from "@/app/types/employment";
import { FORMAT_ISO_8601_EXTENDED } from "@/app/config/settings";
import React from "react";
import { RadioComponent } from "@/app/component/RadioComponent";

type Props = {
  employment: Employment | null;
  staffingTransaction: Dictionary["workforce"]["staffingTransaction"];
};

export default function TransactionPurpose({
  employment,
  staffingTransaction,
}: Readonly<Props>) {
  const dispatch = useAppDispatch();
  const defaultValues = useAppSelector(
    (state) => state.staffingTransaction.transactionPurposePage,
  );
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TransactionPurposeSchema>({
    mode: "onBlur",
    resolver: zodResolver(
      getPurposeSchema(staffingTransaction.transactionPurpose.field),
    ),
    defaultValues: {
      ...defaultValues,
      effectiveDate: dayjs(defaultValues.effectiveDate),
    },
  });

  const purposeValue = watch("purpose");

  return (
    <>
      <Stack gap={2}>
        <RadioComponent
          control={control}
          name="purpose"
          label={staffingTransaction.transactionPurpose.field.purpose.label}
          values={staffingTransaction.transactionPurpose.purposes}
        />

        {purposeValue === "Other" && (
          <TextFieldComponent
            control={control}
            name="reason"
            label={staffingTransaction.transactionPurpose.field.reason.label}
            errors={errors}
          />
        )}

        <DatePickerComponent
          disablePast
          control={control}
          label={
            staffingTransaction.transactionPurpose.field.effectiveDate.label
          }
          name="effectiveDate"
        />

        <EmploymentRecordForm
          control={control}
          errors={errors}
          name="employmentDetailId"
          employmentDetails={employment?.employmentDetails}
          inputLabel={
            staffingTransaction.transactionPurpose.field.employmentRecord.label
          }
        />
      </Stack>
      <BackNextButtons
        handleNext={handleSubmit(
          (onvalid) =>
            dispatch(
              goToTransactionDetailsPage({
                ...onvalid,
                effectiveDate: onvalid.effectiveDate.format(
                  FORMAT_ISO_8601_EXTENDED,
                ),
              }),
            ),
          (formError) => console.log(formError),
        )}
        buttonLabels={staffingTransaction.button}
      />
    </>
  );
}
