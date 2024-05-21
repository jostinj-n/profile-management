"use client";
import React, { FC } from "react";
import { useAppSelector } from "@/app/redux/hooks";
import { ButtonLabels, NewProfileLabels } from "@/dictionaries/dictionaries";
import { PersonProfile } from "@/app/[lang]/workforce/profile-update/personProfile/personProfile";
import { BankingInformation } from "@/app/[lang]/workforce/profile-update/bankingInformation/bankingInformation";
import { GovernmentIDs } from "@/app/[lang]/workforce/profile-update/governmentIDs/governmentIDs";
import { EmploymentInformation } from "@/app/[lang]/workforce/profile-update/employmentInformation/employmentInformation";
import { Seniority } from "@/app/[lang]/workforce/profile-update/seniority/seniority";
import { Button, Stack } from "@mui/material";
import { useUpdateButton } from "@/app/[lang]/workforce/profile-update/hooks/useUpdateButton";
import { ContactDetails } from "@/app/[lang]/workforce/profile-update/contactDetails/contactDetails";

type Props = {
  updateProfileLabels: NewProfileLabels;
  id: string;
  buttonLabels: ButtonLabels;
};

export const ProfileUpdateWrapper: FC<Props> = ({
  updateProfileLabels,
  id,
  buttonLabels,
}) => {
  const {
    personForm,
    bankingForm,
    contactForm,
    idRecordsForm,
    seniorityForm,
    handleClick,
  } = useUpdateButton(id);
  const activeStep = useAppSelector(
    (state) => state.profileUpdateSideNav.activeStep,
  );
  return (
    <>
      {activeStep === 0 && (
        <PersonProfile
          control={personForm.control}
          errors={personForm.errors}
          personProfileDictionnary={updateProfileLabels.firstPage}
        />
      )}
      {activeStep === 1 && (
        <BankingInformation
          control={bankingForm.control}
          errors={bankingForm.errors}
          bankingInformationDictionary={updateProfileLabels.thirdPage}
          getBanksValues={bankingForm.getValues}
        />
      )}
      {activeStep === 2 && (
        <ContactDetails
          control={contactForm.control}
          errors={contactForm.errors}
          contactDetailsDictionary={updateProfileLabels.fourthPage}
          emergencyDictionary={updateProfileLabels.fifthPage}
          button={buttonLabels}
        />
      )}
      {activeStep === 3 && (
        <GovernmentIDs
          governmentSectionDictionary={updateProfileLabels.secondPage}
          control={idRecordsForm.control}
          errors={idRecordsForm.errors}
        />
      )}
      {activeStep === 4 && <EmploymentInformation />}
      {activeStep === 5 && (
        <Seniority
          seniorityDictionary={
            updateProfileLabels.eighthPage.section.seniorityDetails
          }
          control={seniorityForm.control}
          errors={seniorityForm.errors}
        />
      )}
      <Stack
        position={"fixed"}
        bottom={10}
        right={0}
        gap={1}
        pr={2}
        direction="row"
        alignItems={"center"}
        justifyContent={"flex-end"}
      >
        <Button variant="cancel">CANCEL</Button>
        <Button variant="contained" onClick={handleClick}>
          UPDATE
        </Button>
      </Stack>
    </>
  );
};
