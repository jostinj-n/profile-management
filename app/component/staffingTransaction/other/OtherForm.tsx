import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { goToSummaryPage } from "@/app/redux/features/staffing-transaction/stfSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";

import { SelectDataControl } from "../SelectDataControl";
import { TextFieldComponent } from "../../TextFieldComponent";
import BackNextButtons from "../BackNextButtons";
import { useGetDataQuery } from "@/app/redux/features/staffing-transaction/referenceDataApi";
import { TextAreaComponent } from "../../TextAreaComponent";
import { DropdownOption } from "@/app/types/referenceData";
import { getOtherSchema, OtherState, OtherType } from "./OtherType";
import { useCallback, useEffect } from "react";
import { StaffingTransactionProps } from "@/app/[lang]/employee/[id]/staffing-transaction/component/PurposeComponent";

export default function OtherForm({
  staffingTransaction,
}: Readonly<StaffingTransactionProps>) {
  const dispatch = useAppDispatch();
  const defaultValues = useAppSelector(
    (state) => state.staffingTransaction.transactionDetails,
  ) as OtherState;

  const { data: roeData } = useGetDataQuery("roe");

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<OtherType>({
    mode: "onBlur",
    resolver: zodResolver(
      getOtherSchema(staffingTransaction.transactionDetails.other),
    ),
    defaultValues: {
      ...defaultValues,
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

  return (
    <>
      <Stack gap={3}>
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
              staffingTransaction.transactionDetails.resignation.roe_code.label
            }
            onValueSelected={onValueSelected}
          />
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
              }),
            ),
          (formError) => console.log(formError),
        )}
        buttonLabels={staffingTransaction.button}
      />
    </>
  );
}
