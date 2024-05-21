"use client";

import { Button, Stack } from "@mui/material";
import React, { FC, useEffect } from "react";
import { Dictionary, FirstPageDictionary } from "@/dictionaries/dictionaries";
import { EmployeeIdentification } from "@/app/[lang]/workforce/create-profile/firstPage/components/employeeIdentification";
import { PersonalDetails } from "@/app/[lang]/workforce/create-profile/firstPage/components/personalDetails";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { continueToSecondStep } from "@/app/redux/features/newProfileSlice";
// eslint-disable-next-line import/no-extraneous-dependencies
import dayjs from "dayjs";
import { firstPageSchema } from "./schemas/firstPage";
import { Species } from "./components/species";
import { fetchReferenceTableData } from "@/app/redux/features/newProfileReferenceData";

export type FirstPageType = z.infer<typeof firstPageSchema>;

type Props = {
  newProfileLabels: FirstPageDictionary;
  buttonLabels: Dictionary["button"];
};

export const FirstPage: FC<Props> = ({ newProfileLabels, buttonLabels }) => {
  const dispatch = useAppDispatch();
  const initialValue = useAppSelector((state) => state.newProfile.firstPage);
  const { data } = useAppSelector(
    (state) => state.newProfileRefData.referenceTableData,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FirstPageType>({
    mode: "onBlur",
    resolver: zodResolver(firstPageSchema),
    defaultValues: {
      ...initialValue,
      dateOfBirth: dayjs(initialValue.dateOfBirth),
      effectiveDate: dayjs(initialValue.effectiveDate),
    },
  });

  useEffect(() => {
    dispatch(fetchReferenceTableData());
  }, [dispatch]);

  return (
    <Stack gap={4}>
      <EmployeeIdentification
        employeeIdentification={newProfileLabels.section.employeeIdentification}
        control={control}
        errors={errors}
        data={data}
      />
      <PersonalDetails
        personalDetails={newProfileLabels.section.personalDetails}
        control={control}
        errors={errors}
        setValue={setValue}
        data={data}
      />
      <Species
        species={newProfileLabels.section.species}
        control={control}
        errors={errors}
        data={data}
      />
      <Stack direction="row" gap={3}>
        <Button
          data-testid="continue-first-page"
          variant="contained"
          onClick={handleSubmit(
            (submitData) => {
              // DaysJS is not serializable, so we save it as string instead
              const firstPageData = {
                ...submitData,
                dateOfBirth: submitData.dateOfBirth.format(),
                effectiveDate: submitData.effectiveDate.format(),
              };
              return dispatch(continueToSecondStep(firstPageData));
            },
            (formErrors) => console.log("formErrors", formErrors),
          )}
        >
          {buttonLabels.continue}
        </Button>
        <Button variant="text">{buttonLabels.back}</Button>
      </Stack>
    </Stack>
  );
};
