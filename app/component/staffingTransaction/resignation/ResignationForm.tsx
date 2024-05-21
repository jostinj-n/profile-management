import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import {
  goToSummaryPage,
  updateTransactionDetails,
} from "@/app/redux/features/staffing-transaction/stfSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";

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
import {
  getResignationSchema,
  ResignationState,
  ResignationType,
} from "./ResignationType";
import { RadioComponent } from "../../RadioComponent";
import { useCallback, useEffect } from "react";
import { StaffingTransactionProps } from "@/app/[lang]/employee/[id]/staffing-transaction/component/PurposeComponent";

export default function ResignationForm({
  staffingTransaction,
}: Readonly<StaffingTransactionProps>) {
  const dispatch = useAppDispatch();
  const defaultValues = useAppSelector(
    (state) => state.staffingTransaction.transactionDetails,
  ) as ResignationState;

  const { data: roeData } = useGetDataQuery("roe");
  const { data: reason } = useGetDataQuery("reason");

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ResignationType>({
    mode: "onBlur",
    resolver: zodResolver(
      getResignationSchema(staffingTransaction.transactionDetails.resignation),
    ),
    defaultValues: {
      ...defaultValues,
      last_day_work_in_role: dayjs(defaultValues.last_day_work_in_role),
      rehire_flag: defaultValues.rehire_flag ? "Yes" : "No",
    },
  });

  const onValueSelected = useCallback(
    (code: string) => {
      const selectedRoe = (roeData as DropdownOption[])?.find(
        (item) => item.code === code,
      );
      if (selectedRoe) setValue("code_description", selectedRoe.name);
    },
    [roeData, setValue],
  );

  useEffect(() => {
    onValueSelected(defaultValues.roe_code);
  }, [defaultValues, onValueSelected]);

  const onReasonSelected = (value: string) => {
    dispatch(
      updateTransactionDetails({
        ...defaultValues,
        reason: value,
      }),
    );
  };

  return (
    <>
      <Stack gap={3}>
        <DatePickerComponent
          required
          control={control}
          label={
            staffingTransaction.transactionDetails.resignation
              .last_day_work_in_role.label
          }
          name="last_day_work_in_role"
        />

        <Stack direction={"row"} gap={3}>
          <SelectDataControl
            control={control}
            errors={errors}
            required
            name="reason"
            data={(reason as DropdownOption[])?.map((item) => item.name) || []}
            inputLabel={
              staffingTransaction.transactionDetails.resignation.reason.label
            }
            onValueSelected={onReasonSelected}
          />
          <TextFieldComponent
            control={control}
            required
            name="other_reason_notes"
            label={
              staffingTransaction.transactionDetails.resignation
                .other_reason_notes.label
            }
            errors={errors}
            isDisabled={defaultValues.reason !== "Other"}
          />
        </Stack>
        <RadioComponent
          control={control}
          required
          name="rehire_flag"
          label={
            staffingTransaction.transactionDetails.resignation.rehire_flag.label
          }
          values={["Yes", "No"]}
        />
        <TextAreaComponent
          control={control}
          name="notes_for_rehire_selection"
          label={
            staffingTransaction.transactionDetails.resignation
              .notes_for_rehire_selection.label
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
            staffingTransaction.transactionDetails.resignation.employment_status
              .label
          }
        />

        <Stack direction={"row"} gap={3}>
          {roeData && (
            <SelectDataControl
              control={control}
              errors={errors}
              name="roe_code"
              data={
                (roeData as DropdownOption[])?.map(
                  (item) => item?.code || "",
                ) || []
              }
              inputLabel={
                staffingTransaction.transactionDetails.resignation.roe_code
                  .label
              }
              onValueSelected={onValueSelected}
            />
          )}
          <TextFieldComponent
            control={control}
            name="code_description"
            label={
              staffingTransaction.transactionDetails.resignation
                .code_description.label
            }
            errors={errors}
          />
        </Stack>

        <TextAreaComponent
          control={control}
          name="explanation"
          label={
            staffingTransaction.transactionDetails.resignation.explanation.label
          }
          errors={errors}
        />
      </Stack>
      <BackNextButtons
        handleNext={handleSubmit(
          (onvalid) =>
            dispatch(
              goToSummaryPage({
                ...onvalid,
                last_day_work_in_role: onvalid.last_day_work_in_role.format(
                  FORMAT_ISO_8601_EXTENDED,
                ),
                rehire_flag: onvalid.rehire_flag === "Yes",
              }),
            ),
          (formError) => console.log(formError),
        )}
        buttonLabels={staffingTransaction.button}
      />
    </>
  );
}
