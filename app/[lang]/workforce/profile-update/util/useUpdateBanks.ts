import { usePutBankingInformationMutation } from "@/app/redux/features/updateProfile/api/updateProfileAPI";
import { UseFormGetValues } from "react-hook-form";
import { BankingInformationType } from "@/app/[lang]/workforce/profile-update/bankingInformation/zodSchema/bankingInformationSchema";
import {
  enqueueSuccessSnackbar,
  enqueueWarningSnackbar,
} from "@/app/[lang]/workforce/profile-update/util/notistack";

export const useUpdateBanks = (
  getValues: UseFormGetValues<BankingInformationType>,
) => {
  const [putBankingInformation] = usePutBankingInformationMutation();

  return () => {
    getValues().banks.forEach((bank) =>
      putBankingInformation(bank)
        .unwrap()
        .then(() => {
          enqueueSuccessSnackbar("Banks Updated successfully");
        })
        .catch((error) => {
          enqueueWarningSnackbar(`${error.data.message}`);
        }),
    );
  };
};
