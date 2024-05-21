import { Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { Control, FieldErrors, UseFormGetValues } from "react-hook-form";
import React, { FC, useEffect } from "react";
import { fetchReferenceTableData } from "@/app/redux/features/newProfileReferenceData";
import { BankingInformationType } from "@/app/[lang]/workforce/profile-update/bankingInformation/zodSchema/bankingInformationSchema";
import { BankingInformationSection } from "@/app/[lang]/workforce/profile-update/bankingInformation/components/bankingInformationSection";
import { ThirdPageDictionnary } from "@/dictionaries/dictionaries";

type Props = {
  bankingInformationDictionary: ThirdPageDictionnary;
  control: Control<BankingInformationType>;
  errors: FieldErrors<BankingInformationType>;
  getBanksValues: UseFormGetValues<BankingInformationType>;
};

export const BankingInformation: FC<Props> = ({
  bankingInformationDictionary,
  control,
  errors,
  getBanksValues,
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
      <BankingInformationSection
        control={control}
        errors={errors}
        data={data}
        bankingInformationDictionary={bankingInformationDictionary}
        getBanksValues={getBanksValues}
      />
    </Stack>
  );
};
