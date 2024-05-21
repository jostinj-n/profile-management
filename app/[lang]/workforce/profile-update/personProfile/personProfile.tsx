import { Stack } from "@mui/material";
import React, { FC, useEffect } from "react";
import { Control, FieldErrors } from "react-hook-form";
import { FirstPageDictionary } from "@/dictionaries/dictionaries";
import { PersonProfileType } from "@/app/[lang]/workforce/profile-update/personProfile/zodSchema/personProfileSchema";
import { PersonProfileSection } from "@/app/[lang]/workforce/profile-update/personProfile/components/personalProfile";
import { fetchReferenceTableData } from "@/app/redux/features/newProfileReferenceData";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";

type Props = {
  personProfileDictionnary: FirstPageDictionary;
  control: Control<PersonProfileType>;
  errors: FieldErrors<PersonProfileType>;
};

export const PersonProfile: FC<Props> = ({
  personProfileDictionnary,
  control,
  errors,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchReferenceTableData());
  }, [dispatch]);

  const { data } = useAppSelector(
    (state) => state.newProfileRefData.referenceTableData,
  );

  return (
    <Stack>
      <PersonProfileSection
        control={control}
        errors={errors}
        personProfileDictionnary={
          personProfileDictionnary.section.personalDetails
        }
        data={data}
      />
    </Stack>
  );
};
