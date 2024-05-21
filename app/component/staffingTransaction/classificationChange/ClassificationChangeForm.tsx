import { FC } from "react";
import {
  classificationChangeSchema,
  ClassificationChangeType,
  classificationInitValue,
} from "@/app/component/staffingTransaction/classificationChange/ClassificationChangeType";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { Line } from "@/app/component/Line";
import BackNextButtons from "@/app/component/staffingTransaction/BackNextButtons";
import { goToSummaryPage } from "@/app/redux/features/staffing-transaction/stfSlice";
import { FORMAT_ISO_8601_EXTENDED } from "@/app/config/settings";
import { useAppDispatch } from "@/app/redux/hooks";
import dayjs from "dayjs";
import { StaffingTransactionProps } from "@/app/[lang]/employee/[id]/staffing-transaction/component/PurposeComponent";
import { ClassifForm } from "@/app/component/staffingTransaction/classificationChange/component/ClassifForm";
import { PreviousPosition } from "@/app/component/staffingTransaction/classificationChange/component/PreviousPosition";

export const ClassificationChangeForm: FC<StaffingTransactionProps> = ({
  staffingTransaction,
}) => {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassificationChangeType>({
    mode: "onBlur",
    resolver: zodResolver(
      classificationChangeSchema(
        staffingTransaction.transactionDetails.classificationChange,
      ),
    ),
    defaultValues: {
      ...classificationInitValue,
      vacationEntitlementDate: dayjs(),
    },
  });

  return (
    <Stack gap={5}>
      <Line gap={3}>
        <ClassifForm
          control={control}
          errors={errors}
          labels={staffingTransaction.transactionDetails.classificationChange}
        />
        <PreviousPosition
          labels={staffingTransaction.transactionDetails.classificationChange}
        />
      </Line>

      <BackNextButtons
        handleNext={handleSubmit(
          (onValid) => {
            dispatch(
              goToSummaryPage({
                ...onValid,
                vacationEntitlementDate: onValid.vacationEntitlementDate.format(
                  FORMAT_ISO_8601_EXTENDED,
                ),
              }),
            );
          },
          (formError) => console.log(formError),
        )}
        buttonLabels={staffingTransaction.button}
      />
    </Stack>
  );
};
