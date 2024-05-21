import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLazyBankInformationUpdateProfileQuery } from "@/app/redux/features/updateProfile/api/bankInformationAPI";
import {
  bankingInformationSchema,
  BankingInformationType,
} from "@/app/[lang]/workforce/profile-update/bankingInformation/zodSchema/bankingInformationSchema";

export const useBankingInformationForm = (id: string) => {
  const [getBanksInformation] = useLazyBankInformationUpdateProfileQuery();

  const {
    control: banksControl,
    getValues: getBanksValues,
    formState: {
      errors: banksErrors,
      isDirty: banksDirty,
      isValid: banksValid,
    },
  } = useForm<BankingInformationType>({
    mode: "onBlur",
    resolver: zodResolver(bankingInformationSchema),
    defaultValues: () => getBanksInformation(id).unwrap(),
  });

  return {
    banksForm: {
      control: banksControl,
      errors: banksErrors,
      getValues: getBanksValues,
      isDirty: banksDirty,
      isValid: banksValid,
    },
  };
};
