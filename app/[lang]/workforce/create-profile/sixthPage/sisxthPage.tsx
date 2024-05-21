import { FC } from "react";
import { Dictionary, SixthPageDictionnary } from "@/dictionaries/dictionaries";
import z from "zod";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Stack } from "@mui/material";
import { GardaButtonPrimary } from "@/app/[lang]/gardaComponent/primaryButton/gardaButtonPrimary";
import {
  backOneStep,
  continueToSeventhStep,
} from "@/app/redux/features/newProfileSlice";
import { GardaButtonTertiary } from "@/app/[lang]/gardaComponent/gardaButtonTertiary";
import { sixthPageSchema } from "./schemas/sisxthPage";
import { Employer } from "./components/employer";
import { Role } from "./components/role";
import { EmploymentDetails } from "./components/emplymentDetails";
import { WorkPhone } from "./components/workPhone";
import { WorkEmail } from "./components/workEmail";
import dayjs from "dayjs";

// Add third page type based on the schema
export type SixthPageType = z.infer<typeof sixthPageSchema>;

type Props = {
  newProfileLabels: SixthPageDictionnary;
  buttonLabels: Dictionary["button"];
};

/*Here , we render the same form twice. Each form uses different control,handlesubmit and errors. */
export const SixthPage: FC<Props> = ({ newProfileLabels, buttonLabels }) => {
  const dispatch = useAppDispatch();
  const initialValue = useAppSelector((state) => state.newProfile.sixthPage);
  const { data } = useAppSelector(
    (state) => state.newProfileRefData.referenceTableData,
  );
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<SixthPageType>({
    mode: "onBlur",
    resolver: zodResolver(sixthPageSchema),
    defaultValues: {
      ...initialValue,
      jobHireDate: dayjs(initialValue.jobHireDate),
      firstDayOfWork: dayjs(initialValue.firstDayOfWork),
      probationPeriod: dayjs(initialValue.probationPeriod),
      originalHireDate: dayjs(initialValue.originalHireDate),
      terminationDate: dayjs(initialValue.terminationDate),
      lastDayOnRole: dayjs(initialValue.lastDayOnRole),
    },
  });
  return (
    <Stack>
      <Stack gap={3}>
        <Employer
          control={control}
          errors={errors}
          employer={newProfileLabels.section.employer}
          setValue={setValue}
          data={data}
        />
        <Role
          control={control}
          errors={errors}
          role={newProfileLabels.section.role}
          data={data}
        />
        <EmploymentDetails
          control={control}
          employmentDetails={newProfileLabels.section.employmentDetails}
        />
        <WorkPhone
          control={control}
          errors={errors}
          workPhone={newProfileLabels.section.workPhone}
          data={data}
        />
        <WorkEmail
          control={control}
          errors={errors}
          workEmail={newProfileLabels.section.workEmail}
        />
        <Stack direction="row" gap={3}>
          <GardaButtonPrimary
            onClick={handleSubmit(
              (submitData) => {
                // DaysJS is not serializable, so we save it as string instead
                const sisxthPageData = {
                  ...submitData,
                  jobHireDate: submitData.jobHireDate.format(),
                  firstDayOfWork: submitData.firstDayOfWork.format(),
                  probationPeriod: submitData.probationPeriod.format(),
                  originalHireDate: submitData.originalHireDate.format(),
                  terminationDate: submitData.originalHireDate.format(),
                  lastDayOnRole: submitData.originalHireDate.format(),
                };
                return dispatch(continueToSeventhStep(sisxthPageData));
              },
              (formErrors) => console.log("formErrors", formErrors),
            )}
          >
            {buttonLabels.continue}
          </GardaButtonPrimary>
          <GardaButtonTertiary
            onClick={handleSubmit(
              (backStepData) => {
                // DaysJS is not serializable, so we save it as string instead
                const sisxthPageData = {
                  ...backStepData,
                  jobHireDate: backStepData.jobHireDate.format(),
                  firstDayOfWork: backStepData.firstDayOfWork.format(),
                  probationPeriod: backStepData.probationPeriod.format(),
                  originalHireDate: backStepData.originalHireDate.format(),
                  terminationDate: backStepData.originalHireDate.format(),
                  lastDayOnRole: backStepData.originalHireDate.format(),
                };
                return dispatch(
                  backOneStep({ page: "sixthPage", data: sisxthPageData }),
                );
              },
              (formErrors) => console.log("formErrors", formErrors),
            )}
          >
            {buttonLabels.back}
          </GardaButtonTertiary>
        </Stack>
      </Stack>
    </Stack>
  );
};
