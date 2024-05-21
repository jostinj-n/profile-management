import { FC } from "react";
import { Dictionary, ThirdPageDictionnary } from "@/dictionaries/dictionaries";
import { thirdPageSchema } from "./schema/thirdPage";
import z from "zod";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Stack } from "@mui/material";
import { GardaButtonPrimary } from "@/app/[lang]/gardaComponent/primaryButton/gardaButtonPrimary";
import {
  backOneStep,
  continueToFourthStep,
} from "@/app/redux/features/newProfileSlice";
import { GardaButtonTertiary } from "@/app/[lang]/gardaComponent/gardaButtonTertiary";
import { BankingInfo } from "./components/bankingInfo";

// Add third page type based on the schema
export type ThirdPageType = z.infer<typeof thirdPageSchema>;

type Props = {
  newProfileLabels: ThirdPageDictionnary;
  buttonLabels: Dictionary["button"];
};

/*Here , we render the same form twice. Each form uses different control,handlesubmit and errors. */
export const ThirdPage: FC<Props> = ({ newProfileLabels, buttonLabels }) => {
  const dispatch = useAppDispatch();
  const initialValue = useAppSelector((state) => state.newProfile.thirdPage);
  const { data } = useAppSelector(
    (state) => state.newProfileRefData.referenceTableData,
  );
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<ThirdPageType>({
    mode: "onBlur",
    resolver: zodResolver(thirdPageSchema),
    defaultValues: {
      ...initialValue,
    },
  });
  return (
    <Stack>
      <Stack gap={3}>
        <BankingInfo
          control={control}
          errors={errors}
          bankingInfo={newProfileLabels}
          setValue={setValue}
          data={data}
        />
        <Stack direction="row" gap={3}>
          <GardaButtonPrimary
            onClick={handleSubmit(
              (submitData) => {
                // DaysJS is not serializable, so we save it as string instead
                const thirdPageDate = {
                  ...submitData,
                };
                return dispatch(continueToFourthStep(thirdPageDate));
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
                const thirdPageDate = {
                  ...backStepData,
                };
                return dispatch(
                  backOneStep({ page: "thirdPage", data: thirdPageDate }),
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
