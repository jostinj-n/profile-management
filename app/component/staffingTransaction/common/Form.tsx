import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { goToSummaryPage } from "@/app/redux/features/staffing-transaction/stfSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import BackNextButtons from "../BackNextButtons";
import dayjs from "dayjs";
import { FORMAT_ISO_8601_EXTENDED } from "@/app/config/settings";
import { fields, getSchema, MainState, MainType } from "./PromoDemoTransType";

import { PreviousEmploymentDetail } from "@/app/redux/features/staffing-transaction/employmentDetailsApi";
import { Dictionary } from "@/dictionaries/dictionaries";
import { FormComponent } from "./FormComponent";
import { useForm } from "react-hook-form";
import SelectRefStringDataComponent from "../SelectRefStringDataComponent";
import Stack from "@mui/material/Stack";
import { RootState } from "@/app/redux/store";
import { createSelector } from "reselect";

type Props = {
  staffingTransaction: Dictionary["workforce"]["staffingTransaction"];
  previousEmployment: PreviousEmploymentDetail;
};

const createFormSelector = createSelector(
  (state: RootState) =>
    state.staffingTransaction.transactionPurposePage.purpose,
  (state: RootState) =>
    state.staffingTransaction.transactionDetails as MainState,

  (purpose, transactionDetails) => {
    return {
      purpose,
      defaultValues: transactionDetails,
    };
  }
);

export default function Form({
  staffingTransaction,
  previousEmployment,
}: Readonly<Props>) {
  const dispatch = useAppDispatch();
  const { defaultValues, purpose } = useAppSelector(createFormSelector);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<MainType>({
    mode: "onBlur",
    resolver: zodResolver(
      getSchema(
        staffingTransaction.transactionDetails.mainPromotionDemotionTransfer
      )
    ),
    defaultValues: {
      ...defaultValues,
      newWorkLocationCode: previousEmployment?.workLocationCode,
      newWorkLocationName: previousEmployment?.workLocationName,
      newDepartment: previousEmployment?.department,
      employmentStatus: previousEmployment?.employmentStatus,
      newDivision: previousEmployment.division,
      newEmploymentClassification: previousEmployment?.employmentClassification,
      lastDayWorkedInRole: dayjs(defaultValues.lastDayWorkedInRole),
      firstDayWorkedInRole: dayjs(defaultValues.firstDayWorkedInRole),
    },
  });

  const setCustomValue = (name: keyof MainType, value: unknown) => {
    setValue(name, value as string);
  };

  return (
    <>
      <Stack gap={3}>
        {purpose === "Transfer" && (
          <SelectRefStringDataComponent
            required
            control={control}
            errors={errors}
            name={"transferType"}
            inputLabel={
              staffingTransaction.transactionDetails.transfer.transferType.label
            }
            filterName={"transfer_type"}
          />
        )}
        <FormComponent
          control={control}
          errors={errors}
          fields={fields}
          mainLabels={
            staffingTransaction.transactionDetails.mainPromotionDemotionTransfer
          }
          watch={watch}
          setCustomValue={setCustomValue}
        />
      </Stack>
      <BackNextButtons
        buttonLabels={staffingTransaction.button}
        handleNext={handleSubmit(
          (onvalid) =>
            dispatch(
              goToSummaryPage({
                ...onvalid,
                firstDayWorkedInRole: onvalid.firstDayWorkedInRole.format(
                  FORMAT_ISO_8601_EXTENDED
                ),
                lastDayWorkedInRole: onvalid.lastDayWorkedInRole.format(
                  FORMAT_ISO_8601_EXTENDED
                ),
              })
            ),
          (formError) => console.log(formError)
        )}
      />
    </>
  );
}
