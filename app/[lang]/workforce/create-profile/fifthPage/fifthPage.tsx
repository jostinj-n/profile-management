import { FC } from "react";
import { Dictionary, FifthPageDictionnary } from "@/dictionaries/dictionaries";
import z from "zod";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Stack, Typography } from "@mui/material";
import { GardaButtonPrimary } from "@/app/[lang]/gardaComponent/primaryButton/gardaButtonPrimary";
import {
  backOneStep,
  continueToSixththStep,
  initialEmergencyContact,
} from "@/app/redux/features/newProfileSlice";
import { GardaButtonTertiary } from "@/app/[lang]/gardaComponent/gardaButtonTertiary";
import { fifthPageSchema } from "@/app/[lang]/workforce/create-profile/fifthPage/schema/fifthPage";
import EmergencyProfile from "./components/emergencyProfile";
import { Phone } from "./components/phone";
import { Email } from "./components/email";
import AddIcon from "@mui/icons-material/Add";

// Add third page type based on the schema
export type FifthPageType = z.infer<typeof fifthPageSchema>;

type Props = {
  newProfileLabels: FifthPageDictionnary;
  buttonLabels: Dictionary["button"];
};

export const FifthPage: FC<Props> = ({ newProfileLabels, buttonLabels }) => {
  const dispatch = useAppDispatch();
  const initialValue = useAppSelector((state) => state.newProfile.fifthPage);
  const { data } = useAppSelector(
    (state) => state.newProfileRefData.referenceTableData,
  );
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    watch,
  } = useForm<FifthPageType>({
    mode: "onBlur",
    resolver: zodResolver(fifthPageSchema),
    defaultValues: { ...initialValue },
  });
  const sizeOfEmergencies = Object.keys(getValues()).length;
  watch();
  return (
    <Stack>
      <Stack gap={3}>
        {Array.from(Array(sizeOfEmergencies).keys()).map((index) => (
          <>
            <EmergencyProfile
              indexEmergencyContacts={index}
              control={control}
              errors={errors}
              emergencyProfile={newProfileLabels.section.emergencyProfile}
              data={data}
            />
            <Phone
              indexEmergencyContacts={index}
              control={control}
              errors={errors}
              phone={newProfileLabels.section.phone}
              setValue={setValue}
              getValues={getValues}
              data={data}
            />
            <Email
              indexEmergencyContacts={index}
              control={control}
              errors={errors}
              email={newProfileLabels.section.email}
              setValue={setValue}
            />
          </>
        ))}
        <Stack direction={"row"}>
          <Button
            color="primary"
            variant="text"
            onClick={() => {
              setValue(`${sizeOfEmergencies}`, initialEmergencyContact);
            }}
            startIcon={<AddIcon color="primary" fontSize="medium" />} // Place AddIcon at the beginning
          >
            <Typography sx={{ fontSize: 15, fontWeight: "bold" }}>
              {" "}
              {newProfileLabels.section.emergencyProfile.add}
            </Typography>
          </Button>
        </Stack>

        <Stack direction="row" gap={3}>
          <GardaButtonPrimary
            onClick={handleSubmit(
              (submitData) => {
                // DaysJS is not serializable, so we save it as string instead
                const fifthPageData = {
                  ...submitData,
                };
                return dispatch(continueToSixththStep(fifthPageData));
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
                const fifthPageData = {
                  ...backStepData,
                };
                return dispatch(
                  backOneStep({ page: "fifthPage", data: fifthPageData }),
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
