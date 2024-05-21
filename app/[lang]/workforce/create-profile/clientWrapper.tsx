"use client";
import { ButtonLabels, NewProfileLabels } from "@/dictionaries/dictionaries";
import React, { FC } from "react";
import {
  Box,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { FirstPage } from "@/app/[lang]/workforce/create-profile/firstPage/firstPage";
import { SecondPage } from "@/app/[lang]/workforce/create-profile/secondPage/secondPage";
import { FourthPage } from "@/app/[lang]/workforce/create-profile/fourthPage/fourthPage";
import { ThirdPage } from "@/app/[lang]/workforce/create-profile/thirdPage/thirdPage";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { changeActiveStep } from "@/app/redux/features/newProfileSlice";
import { FifthPage } from "./fifthPage/fifthPage";
import { SixthPage } from "./sixthPage/sisxthPage";
import { SeventhPage } from "./seventhPage/seventhPage";
import { EighthPage } from "./eighthPage/eighthPage";
import { NinthPage } from "./ninthPage/ninthPage";

type Props = {
  newProfileLabels: NewProfileLabels;
  buttonLabels: ButtonLabels;
  steps: string[];
};

export const ClientWrapper: FC<Props> = ({
  newProfileLabels,
  buttonLabels,
  steps,
}) => {
  const activeStep = useAppSelector((state) => state.newProfile.activeStep);
  const dispatch = useAppDispatch();

  return (
    <Stack>
      <Stack>
        <Typography variant="h4">{newProfileLabels.title}</Typography>
      </Stack>
      <Stack gap={20} direction={"row"} p={5}>
        <Stack minWidth={"200px"} gap={4}>
          <Box>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((label, index) => (
                <Step
                  onClick={() => dispatch(changeActiveStep(index))}
                  key={label}
                >
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Stack>
        <Stack width={"60%"}>
          {activeStep === 0 && (
            <FirstPage
              newProfileLabels={newProfileLabels.firstPage}
              buttonLabels={buttonLabels}
            />
          )}
          {activeStep === 1 && (
            <SecondPage
              newProfileLabels={newProfileLabels.secondPage}
              buttonLabels={buttonLabels}
            />
          )}
          {activeStep === 2 && (
            <ThirdPage
              newProfileLabels={newProfileLabels.thirdPage}
              buttonLabels={buttonLabels}
            />
          )}
          {activeStep === 3 && (
            <FourthPage
              newProfileLabels={newProfileLabels.fourthPage}
              buttonLabels={buttonLabels}
            />
          )}
          {activeStep === 4 && (
            <FifthPage
              newProfileLabels={newProfileLabels.fifthPage}
              buttonLabels={buttonLabels}
            />
          )}
          {activeStep === 5 && (
            <SixthPage
              newProfileLabels={newProfileLabels.sixthPage}
              buttonLabels={buttonLabels}
            />
          )}
          {activeStep === 6 && (
            <SeventhPage
              newProfileLabels={newProfileLabels.seventhPage}
              buttonLabels={buttonLabels}
            />
          )}
          {activeStep === 7 && (
            <EighthPage
              newProfileLabels={newProfileLabels.eighthPage}
              buttonLabels={buttonLabels}
            />
          )}
          {activeStep === 8 && (
            <NinthPage
              newProfileLabels={newProfileLabels.ninthPage}
              buttonLabels={buttonLabels}
            />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
