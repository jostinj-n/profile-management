import { FC } from "react";
import { Dictionary, FourthPageDictionnary } from "@/dictionaries/dictionaries";
import { Stack } from "@mui/material";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GardaButtonPrimary } from "@/app/[lang]/gardaComponent/primaryButton/gardaButtonPrimary";
import { GardaButtonTertiary } from "@/app/[lang]/gardaComponent/gardaButtonTertiary";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import {
  backOneStep,
  continueToFifththStep,
} from "@/app/redux/features/newProfileSlice";
import { fourthPageSchema } from "./schemas/fourthPage";
import { Email } from "./components/email";
import { Address } from "./components/address";
import { Phone } from "./components/phone";

//Add second page type base on the schema
export type FourthPageType = z.infer<typeof fourthPageSchema>;

type Props = {
  newProfileLabels: FourthPageDictionnary;
  buttonLabels: Dictionary["button"];
};
export const FourthPage: FC<Props> = ({ newProfileLabels, buttonLabels }) => {
  const dispatch = useAppDispatch();
  const initialValue = useAppSelector((state) => state.newProfile.fourthPage);
  const { data } = useAppSelector(
    (state) => state.newProfileRefData.referenceTableData,
  );
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<FourthPageType>({
    mode: "onBlur",
    resolver: zodResolver(fourthPageSchema),
    defaultValues: {
      ...initialValue,
    },
  });

  return (
    <Stack gap={4} p={3}>
      <Phone
        control={control}
        errors={errors}
        phoneDictionnary={newProfileLabels.section.phone}
        setValue={setValue}
        data={data}
      />
      <Email
        control={control}
        errors={errors}
        emailDictionnary={newProfileLabels.section.email}
        setValue={setValue}
      />
      <Address
        control={control}
        errors={errors}
        addressDictionnary={newProfileLabels.section.address}
        setValue={setValue}
      />
      <Stack direction="row" gap={3}>
        <GardaButtonPrimary
          onClick={handleSubmit(
            (submitData) => {
              // DaysJS is not serializable, so we save it as string instead
              const fourthPageData = {
                ...submitData,
              };
              return dispatch(continueToFifththStep(fourthPageData));
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
              const fourthPageData = {
                ...backStepData,
              };
              return dispatch(
                backOneStep({ page: "fourthPage", data: fourthPageData }),
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
