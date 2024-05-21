import { Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { Control, FieldErrors } from "react-hook-form";
import React, { FC, useEffect } from "react";
import { fetchReferenceTableData } from "@/app/redux/features/newProfileReferenceData";
import { SecondPageDictionnary } from "@/dictionaries/dictionaries";
import { GovernmentSectionType } from "@/app/[lang]/workforce/profile-update/governmentIDs/zodSchema/governmentSchema";
import { CitizenStatusUpdate } from "@/app/[lang]/workforce/profile-update/governmentIDs/components/citizenStatus";
import { GovernmentIDsUpdate } from "@/app/[lang]/workforce/profile-update/governmentIDs/components/governmentIDs";
import { TaxIDsUpdate } from "@/app/[lang]/workforce/profile-update/governmentIDs/components/taxIDs";

type Props = {
  governmentSectionDictionary: SecondPageDictionnary;
  control: Control<GovernmentSectionType>;
  errors: FieldErrors<GovernmentSectionType>;
};

export const GovernmentIDs: FC<Props> = ({
  governmentSectionDictionary,
  control,
  errors,
}) => {
  const dispatch = useAppDispatch();

  const { data } = useAppSelector(
    (state) => state.newProfileRefData.referenceTableData,
  );

  useEffect(() => {
    dispatch(fetchReferenceTableData());
  }, [dispatch]);
  return (
    <Stack>
      <CitizenStatusUpdate
        citizenStatusDictionary={
          governmentSectionDictionary.section.citizenStatus
        }
        control={control}
        errors={errors}
        data={data}
      />
      <GovernmentIDsUpdate
        governmentIDsDictionary={
          governmentSectionDictionary.section.governmentID
        }
        control={control}
        errors={errors}
        data={data}
      />
      <TaxIDsUpdate
        taxIDsDictionary={governmentSectionDictionary.section.taxID}
        control={control}
        errors={errors}
        data={data}
      />
    </Stack>
  );
};
