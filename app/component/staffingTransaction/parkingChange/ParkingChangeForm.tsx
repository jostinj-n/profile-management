import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { goToSummaryPage } from "@/app/redux/features/staffing-transaction/stfSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";

import { DatePickerComponent } from "../../createNewProfile/DatePicker";
import BackNextButtons from "../BackNextButtons";
import dayjs from "dayjs";
import { SelectRefDataFormControl } from "../../seniority/edit-grouping/component/SelectRefDataFormControl";
import { Dictionary } from "@/dictionaries/dictionaries";
import { TextAreaComponent } from "../../TextAreaComponent";
import { FORMAT_ISO_8601_EXTENDED } from "@/app/config/settings";
import {
  getParkingChangeSchema,
  ParkingChangeState,
  ParkingChangeType,
} from "./ParkingChangeType";
import { changeView } from "@/app/redux/features/staffing-transaction/parkingChangeSlice";
import { TextFieldComponent } from "../../TextFieldComponent";

type Props = {
  staffingTransaction: Dictionary["workforce"]["staffingTransaction"];
};

export default function ParkingChangeForm({
  staffingTransaction,
}: Readonly<Props>) {
  const dispatch = useAppDispatch();
  const defaultValues = useAppSelector(
    (state) => state.staffingTransaction.transactionDetails,
  ) as ParkingChangeState;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ParkingChangeType>({
    mode: "onBlur",
    resolver: zodResolver(getParkingChangeSchema()),
    defaultValues: {
      ...defaultValues,
      effective_from: dayjs(defaultValues.effective_from),
      effective_to: dayjs(defaultValues.effective_to),
    },
  });

  return (
    <>
      <Stack gap={3}>
        <Stack direction={"row"} gap={3}>
          <SelectRefDataFormControl
            control={control}
            errors={errors}
            name="parking_pass_type"
            referenceTable="ref_parking_pass_type"
            inputLabel={
              staffingTransaction.transactionDetails.parkingChange
                .parking_pass_type.label
            }
            optionValueLabel="name"
          />

          <TextFieldComponent
            control={control}
            name="pass_number"
            label={
              staffingTransaction.transactionDetails.parkingChange.pass_number
                .label
            }
            errors={errors}
          />
        </Stack>
        <Stack direction={"row"} gap={3}>
          <SelectRefDataFormControl
            control={control}
            errors={errors}
            name="reimbursement_type"
            referenceTable="ref_reimbursement_type"
            inputLabel={
              staffingTransaction.transactionDetails.parkingChange
                .reimbursement_type.label
            }
            optionValueLabel="name"
          />
          <TextFieldComponent
            control={control}
            name="reimbursement_value"
            label={
              staffingTransaction.transactionDetails.parkingChange
                .reimbursement_value.label
            }
            errors={errors}
            type="number"
          />
        </Stack>

        <SelectRefDataFormControl
          control={control}
          errors={errors}
          name="parking_issuing_agency"
          referenceTable="ref_parking_issuing_agency"
          inputLabel={
            staffingTransaction.transactionDetails.parkingChange
              .parking_issuing_agency.label
          }
          optionValueLabel="name"
        />
        <TextFieldComponent
          control={control}
          name="pass_monthly_cost"
          label={
            staffingTransaction.transactionDetails.parkingChange
              .pass_monthly_cost.label
          }
          errors={errors}
          type="number"
        />
        <Stack direction={"row"} gap={3}>
          <DatePickerComponent
            control={control}
            label={
              staffingTransaction.transactionDetails.parkingChange
                .effective_from.label
            }
            name="effective_from"
          />
          <DatePickerComponent
            control={control}
            label={
              staffingTransaction.transactionDetails.parkingChange.effective_to
                .label
            }
            name="effective_to"
          />
        </Stack>
        <Stack direction={"row"} gap={3}>
          <SelectRefDataFormControl
            control={control}
            errors={errors}
            name="vehicle_make"
            referenceTable="ref_vehicle_make"
            inputLabel={
              staffingTransaction.transactionDetails.parkingChange.vehicle_make
                .label
            }
            optionValueLabel="name"
          />
          <TextFieldComponent
            control={control}
            name="vehicle_model"
            label={
              staffingTransaction.transactionDetails.parkingChange.vehicle_model
                .label
            }
            errors={errors}
          />
        </Stack>
        <Stack direction={"row"} gap={3}>
          <SelectRefDataFormControl
            control={control}
            errors={errors}
            name="vehicle_color"
            referenceTable="ref_vehicle_color"
            inputLabel={
              staffingTransaction.transactionDetails.parkingChange.vehicle_color
                .label
            }
            optionValueLabel="name"
          />
          <TextFieldComponent
            control={control}
            name="vehicle_licence_plate"
            label={
              staffingTransaction.transactionDetails.parkingChange
                .vehicle_licence_plate.label
            }
            errors={errors}
          />
        </Stack>
        <TextAreaComponent
          control={control}
          name="explanation"
          label={
            staffingTransaction.transactionDetails.parkingChange.explanation
              .label
          }
          errors={errors}
        />
      </Stack>
      <BackNextButtons
        handleBack={() => dispatch(changeView({ activeFormView: false }))}
        handleNext={handleSubmit((onvalid) =>
          dispatch(
            goToSummaryPage({
              ...onvalid,
              effective_from: onvalid.effective_from.format(
                FORMAT_ISO_8601_EXTENDED,
              ),
              effective_to: onvalid.effective_to.format(
                FORMAT_ISO_8601_EXTENDED,
              ),
            }),
          ),
        )}
        buttonLabels={staffingTransaction.button}
      />
    </>
  );
}
