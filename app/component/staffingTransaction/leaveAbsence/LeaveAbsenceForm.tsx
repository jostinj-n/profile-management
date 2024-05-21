import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { goToSummaryPage } from "@/app/redux/features/staffing-transaction/stfSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import {
  getLeaveAbsenceSchema,
  LeaveAbsenceState,
  LeaveAbsenceType,
} from "./LeaveAbsenceType";
import { SelectDataControl } from "../SelectDataControl";
import { DatePickerComponent } from "../../createNewProfile/DatePicker";
import { TextFieldComponent } from "../../TextFieldComponent";
import BackNextButtons from "../BackNextButtons";
import dayjs from "dayjs";
import { SelectRefDataFormControl } from "../../seniority/edit-grouping/component/SelectRefDataFormControl";
import { useGetDataQuery } from "@/app/redux/features/staffing-transaction/referenceDataApi";
import { TextAreaComponent } from "../../TextAreaComponent";
import { DropdownOption } from "@/app/types/referenceData";
import { FORMAT_ISO_8601_EXTENDED } from "@/app/config/settings";
import { StaffingTransactionProps } from "@/app/[lang]/employee/[id]/staffing-transaction/component/PurposeComponent";
import { GlobalFormError } from "../../GlobalFormError";

export default function LeaveAbsenceForm({
  staffingTransaction,
}: Readonly<StaffingTransactionProps>) {
  const dispatch = useAppDispatch();
  const defaultValues = useAppSelector(
    (state) => state.staffingTransaction.transactionDetails,
  ) as LeaveAbsenceState;

  const { data: loaData } = useGetDataQuery("loa");
  const { data: roeData } = useGetDataQuery("roe");

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LeaveAbsenceType>({
    mode: "onBlur",
    resolver: zodResolver(
      getLeaveAbsenceSchema(
        staffingTransaction.transactionDetails.leaveAbsence,
      ),
    ),
    defaultValues: {
      ...defaultValues,
      date_from: dayjs(defaultValues.date_from),
      date_to: dayjs(defaultValues.date_to),
      date_expected_return_to_work: dayjs(
        defaultValues.date_expected_return_to_work,
      ),
    },
  });

  const onValueSelected = (code: string) => {
    setValue("code_description", "");
    const selectedRoe = (roeData as DropdownOption[])?.find(
      (item) => item.code === code,
    );
    if (selectedRoe) setValue("code_description", selectedRoe.name);
  };

  return (
    <>
      <GlobalFormError errors={errors} />
      <Stack gap={3}>
        <SelectDataControl
          required
          control={control}
          errors={errors}
          name="loa_type"
          data={(loaData as DropdownOption[])?.map((item) => item.name) || []}
          inputLabel={
            staffingTransaction.transactionDetails.leaveAbsence.loa_type.label
          }
        />

        <Stack direction={"row"} gap={3}>
          <DatePickerComponent
            disablePast
            required
            control={control}
            label={
              staffingTransaction.transactionDetails.leaveAbsence.date_from
                .label
            }
            name="date_from"
          />
          <DatePickerComponent
            disablePast
            required
            control={control}
            label={
              staffingTransaction.transactionDetails.leaveAbsence.date_to.label
            }
            name="date_to"
          />
        </Stack>

        <DatePickerComponent
          disablePast
          required
          control={control}
          label={
            staffingTransaction.transactionDetails.leaveAbsence
              .date_expected_return_to_work.label
          }
          name="date_expected_return_to_work"
        />
        <TextAreaComponent
          control={control}
          name="notes"
          label={
            staffingTransaction.transactionDetails.leaveAbsence.notes.label
          }
          errors={errors}
        />

        <SelectRefDataFormControl
          control={control}
          errors={errors}
          required
          name="employment_status"
          referenceTable="employment_status"
          inputLabel={
            staffingTransaction.transactionDetails.leaveAbsence
              .employment_status.label
          }
        />

        <Stack direction={"row"} gap={3}>
          <SelectDataControl
            control={control}
            errors={errors}
            name="roe_code"
            data={
              (roeData as DropdownOption[])?.map((item) => item?.code || "") ||
              []
            }
            inputLabel={
              staffingTransaction.transactionDetails.leaveAbsence.roe_code.label
            }
            onValueSelected={onValueSelected}
          />
          <TextFieldComponent
            control={control}
            name="code_description"
            label={
              staffingTransaction.transactionDetails.leaveAbsence
                .code_description.label
            }
            errors={errors}
          />
        </Stack>

        <TextAreaComponent
          control={control}
          name="explanation"
          label={
            staffingTransaction.transactionDetails.leaveAbsence.explanation
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
                date_from: onvalid.date_from.format(FORMAT_ISO_8601_EXTENDED),
                date_to: onvalid.date_to.format(FORMAT_ISO_8601_EXTENDED),
                date_expected_return_to_work:
                  onvalid.date_expected_return_to_work.format(
                    FORMAT_ISO_8601_EXTENDED,
                  ),
              }),
            ),
          (formError) => console.log(formError),
        )}
      />
    </>
  );
}
