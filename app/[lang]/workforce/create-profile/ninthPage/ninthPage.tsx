import { FC } from "react";
import { Dictionary, ninthPageDictionnary } from "@/dictionaries/dictionaries";
import z from "zod";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Stack } from "@mui/material";
import { GardaButtonPrimary } from "@/app/[lang]/gardaComponent/primaryButton/gardaButtonPrimary";
import {
  backOneStep,
  submitCreateNewProfile,
} from "@/app/redux/features/newProfileSlice";
import { GardaButtonTertiary } from "@/app/[lang]/gardaComponent/gardaButtonTertiary";
import { ninthPageSchema } from "./schemas/ninthPage";
import { ParkingDetails } from "./components/parkingDetails";
import { CostDetails } from "./components/costDetails";
import { VehicleDetails } from "./components/vehicleDetails";
import dayjs from "dayjs";

// Add third page type based on the schema
export type NinthPageType = z.infer<typeof ninthPageSchema>;

type Props = {
  newProfileLabels: ninthPageDictionnary;
  buttonLabels: Dictionary["button"];
};

/*Here , we render the same form twice. Each form uses different control,handlesubmit and errors. */
export const NinthPage: FC<Props> = ({ newProfileLabels, buttonLabels }) => {
  const dispatch = useAppDispatch();
  const initialValue = useAppSelector((state) => state.newProfile.ninthPage);
  const { data } = useAppSelector(
    (state) => state.newProfileRefData.referenceTableData,
  );
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<NinthPageType>({
    mode: "onBlur",
    resolver: zodResolver(ninthPageSchema),
    defaultValues: {
      ...initialValue,
      effectiveFrom: dayjs(initialValue.effectiveFrom),
      effectiveTo: dayjs(initialValue.effectiveTo),
    },
  });
  return (
    <Stack>
      <Stack gap={3}>
        <ParkingDetails
          control={control}
          errors={errors}
          parkingDetails={newProfileLabels.section.parkingDetails}
          data={data}
        />
        <CostDetails
          control={control}
          errors={errors}
          costDetails={newProfileLabels.section.costDetails}
        />
        <VehicleDetails
          control={control}
          errors={errors}
          vehicleDetails={newProfileLabels.section.vehicleDetails}
          data={data}
        />
        <Stack direction="row" gap={3}>
          <GardaButtonPrimary
            onClick={handleSubmit(
              (submitData) => {
                // DaysJS is not serializable, so we save it as string instead
                const firstPageData = {
                  ...submitData,
                  effectiveFrom: submitData.effectiveFrom.format(),
                  effectiveTo: submitData.effectiveTo.format(),
                };
                return dispatch(submitCreateNewProfile(firstPageData));
              },
              (formErrors) => console.log("formErrors", formErrors),
            )}
          >
            {newProfileLabels.section.createNewProfile}
          </GardaButtonPrimary>
          <GardaButtonTertiary
            onClick={handleSubmit(
              (backStepData) => {
                // DaysJS is not serializable, so we save it as string instead
                const ninthPageData = {
                  ...backStepData,
                  effectiveFrom: backStepData.effectiveFrom.format(),
                  effectiveTo: backStepData.effectiveTo.format(),
                };
                return dispatch(
                  backOneStep({ page: "ninthPage", data: ninthPageData }),
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
