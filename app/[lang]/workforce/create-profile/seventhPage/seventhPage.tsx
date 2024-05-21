import { FC } from "react";
import {
  Dictionary,
  SeventhPageDictionnary,
} from "@/dictionaries/dictionaries";
import { Stack } from "@mui/material";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GardaButtonPrimary } from "@/app/[lang]/gardaComponent/primaryButton/gardaButtonPrimary";
import { GardaButtonTertiary } from "@/app/[lang]/gardaComponent/gardaButtonTertiary";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import {
  backOneStep,
  continueToEighthStep,
} from "@/app/redux/features/newProfileSlice";
import { seventhPageSchema } from "./schemas/seventhPage";
import { Associated } from "./components/associated";
import dayjs from "dayjs";

//Add second page type base on the schema
export type SeventhPageType = z.infer<typeof seventhPageSchema>;

type Props = {
  newProfileLabels: SeventhPageDictionnary;
  buttonLabels: Dictionary["button"];
};
export const SeventhPage: FC<Props> = ({ newProfileLabels, buttonLabels }) => {
  const { data } = useAppSelector(
    (state) => state.newProfileRefData.referenceTableData,
  );
  const dispatch = useAppDispatch();
  const initialValue = useAppSelector((state) => state.newProfile.seventhPage);
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<SeventhPageType>({
    mode: "onBlur",
    resolver: zodResolver(seventhPageSchema),
    defaultValues: {
      ...initialValue,
      IDs: initialValue.IDs.map((ID) => ({
        ...ID,
        expiryDate: dayjs(ID.expiryDate),
      })),
    },
  });
  return (
    <Stack gap={4} p={3}>
      <Associated
        control={control}
        errors={errors}
        associated={newProfileLabels.section.associated}
        setValue={setValue}
        data={data}
      />
      <Stack direction="row" gap={3}>
        <GardaButtonPrimary
          onClick={handleSubmit(
            (submitData) => {
              // DaysJS is not serializable, so we save it as string instead
              const seventhPageData = {
                ...submitData,
                IDs: submitData.IDs.map((g) => ({
                  ...g,
                  expiryDate: g.expiryDate.format(),
                })),
              };
              return dispatch(continueToEighthStep(seventhPageData));
            },
            (formErrors) => console.log("formErrors", formErrors),
          )}
        >
          {buttonLabels.continue}
        </GardaButtonPrimary>
        <GardaButtonTertiary
          onClick={handleSubmit((backStepData) => {
            const seventhPageData = {
              ...backStepData,
              IDs: backStepData.IDs.map((g) => ({
                ...g,
                expiryDate: g.expiryDate.format(),
              })),
            };
            dispatch(
              backOneStep({ page: "seventhPage", data: seventhPageData }),
            );
          })}
        >
          {buttonLabels.back}
        </GardaButtonTertiary>
      </Stack>
    </Stack>
  );
};
