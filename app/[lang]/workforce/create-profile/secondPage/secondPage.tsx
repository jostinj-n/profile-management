import { FC } from "react";
import { Dictionary, SecondPageDictionnary } from "@/dictionaries/dictionaries";
import { Button, Stack } from "@mui/material";
import { CitizenStatus } from "@/app/[lang]/workforce/create-profile/secondPage/components/citizenStatus";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GardaButtonTertiary } from "@/app/[lang]/gardaComponent/gardaButtonTertiary";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import {
  backOneStep,
  continueToThirdStep,
} from "@/app/redux/features/newProfileSlice";
import { secondPageSchema } from "./schema/secondPage";
import { GovernmentId } from "./components/governmentId";
import dayjs from "dayjs";
import { BinaryGender } from "./components/binaryGender";
import { TaxID } from "./components/taxID";

//Add second page type base on the schema
export type SecondPageType = z.infer<typeof secondPageSchema>;

type Props = {
  newProfileLabels: SecondPageDictionnary;
  buttonLabels: Dictionary["button"];
};
export const SecondPage: FC<Props> = ({ newProfileLabels, buttonLabels }) => {
  const dispatch = useAppDispatch();
  const initialValue = useAppSelector((state) => state.newProfile.secondPage);
  const { data } = useAppSelector(
    (state) => state.newProfileRefData.referenceTableData,
  );
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<SecondPageType>({
    mode: "onBlur",
    resolver: zodResolver(secondPageSchema),
    defaultValues: {
      ...initialValue,
      effectiveFrom: dayjs(initialValue.effectiveFrom),
      effectiveTo: dayjs(initialValue.effectiveTo),
      governmentIDs: initialValue.governmentIDs.map((g) => ({
        ...g,
        expiryDate: dayjs(g.expiryDate),
      })),
      expiryDateTax: dayjs(initialValue.expiryDateTax),
    },
  });

  return (
    <Stack gap={4} p={3}>
      <CitizenStatus
        control={control}
        errors={errors}
        citizenDetails={newProfileLabels.section.citizenStatus}
        data={data}
      />
      <GovernmentId
        control={control}
        errors={errors}
        governmentID={newProfileLabels.section.governmentID}
        setValue={setValue}
        data={data}
      />
      <BinaryGender
        control={control}
        errors={errors}
        binaryGender={newProfileLabels.section.binaryGender}
        data={data}
      />
      <TaxID
        control={control}
        errors={errors}
        taxID={newProfileLabels.section.taxID}
        data={data}
      />
      <Stack direction="row" gap={3}>
        <Button
          data-testid="continue-first-page"
          variant="contained"
          onClick={handleSubmit(
            (submitData) => {
              // DaysJS is not serializable, so we save it as string instead
              const secondPageData = {
                ...submitData,
                effectiveFrom: submitData.effectiveFrom.format(),
                effectiveTo: submitData.effectiveTo.format(),
                governmentIDs: submitData.governmentIDs.map((g) => ({
                  ...g,
                  expiryDate: g.expiryDate.format(),
                })),
                expiryDateTax: submitData.expiryDateTax.format(),
              };
              return dispatch(continueToThirdStep(secondPageData));
            },
            (formErrors) => console.log("formErrors", formErrors),
          )}
        >
          {buttonLabels.continue}
        </Button>
        <GardaButtonTertiary
          onClick={handleSubmit(
            (backStepData) => {
              // DaysJS is not serializable, so we save it as string instead
              const secondPageData = {
                ...backStepData,
                effectiveFrom: backStepData.effectiveFrom.format(),
                effectiveTo: backStepData.effectiveTo.format(),
                governmentIDs: backStepData.governmentIDs.map((g) => ({
                  ...g,
                  expiryDate: g.expiryDate.format(),
                })),
                expiryDateTax: backStepData.expiryDateTax.format(),
              };
              return dispatch(
                backOneStep({ page: "secondPage", data: secondPageData }),
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
