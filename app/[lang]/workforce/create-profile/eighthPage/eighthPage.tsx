import { FC } from "react";
import { Dictionary, EighthPageDictionnary } from "@/dictionaries/dictionaries";
import { Stack } from "@mui/material";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GardaButtonPrimary } from "@/app/[lang]/gardaComponent/primaryButton/gardaButtonPrimary";
import { GardaButtonTertiary } from "@/app/[lang]/gardaComponent/gardaButtonTertiary";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import {
  backOneStep,
  continueToNinthStep,
} from "@/app/redux/features/newProfileSlice";
import { eighthPageSchema } from "./schemas/eightPage";
import { SeniorityDetails } from "./components/seniorytyDetails";
import dayjs from "dayjs";

//Add second page type base on the schema
export type EighthPageType = z.infer<typeof eighthPageSchema>;

type Props = {
  newProfileLabels: EighthPageDictionnary;
  buttonLabels: Dictionary["button"];
};
export const EighthPage: FC<Props> = ({ newProfileLabels, buttonLabels }) => {
  const dateOfBirth = useAppSelector(
    (state) => state.newProfile.firstPage.dateOfBirth,
  );

  const dispatch = useAppDispatch();
  const initialValue = useAppSelector((state) => state.newProfile.eighthPage);
  const { data } = useAppSelector(
    (state) => state.newProfileRefData.referenceTableData,
  );

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<EighthPageType>({
    mode: "onBlur",
    resolver: zodResolver(eighthPageSchema),
    defaultValues: {
      ...initialValue,
      vacationEntitlementDate: dayjs(initialValue.vacationEntitlementDate),
      workLocationStartDate: dayjs(initialValue.workLocationStartDate),
      statusClassificationStartDate: dayjs(
        initialValue.statusClassificationStartDate,
      ),
    },
  });
  return (
    <Stack gap={4} p={3}>
      <SeniorityDetails
        control={control}
        errors={errors}
        seniorytyDetails={newProfileLabels.section.seniorityDetails}
        dateOfBirth={dayjs(dateOfBirth)}
        data={data}
      />
      <Stack direction="row" gap={3}>
        <GardaButtonPrimary
          onClick={handleSubmit(
            (submitData) => {
              // DaysJS is not serializable, so we save it as string instead
              const seventhPageData = {
                ...submitData,
                vacationEntitlementDate:
                  submitData.vacationEntitlementDate.format(),
                workLocationStartDate:
                  submitData.workLocationStartDate.format(),
                statusClassificationStartDate:
                  submitData.statusClassificationStartDate.format(),
              };
              return dispatch(continueToNinthStep(seventhPageData));
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
              const eighthPageData = {
                ...backStepData,
                vacationEntitlementDate:
                  backStepData.vacationEntitlementDate.format(),
                workLocationStartDate:
                  backStepData.workLocationStartDate.format(),
                statusClassificationStartDate:
                  backStepData.statusClassificationStartDate.format(),
              };
              return dispatch(
                backOneStep({ page: "eighthPage", data: eighthPageData }),
              );
            },
            (formErrors) => console.log("formErrors", formErrors),
          )}
        >
          {buttonLabels.back}
        </GardaButtonTertiary>
      </Stack>
    </Stack>
  );
};
