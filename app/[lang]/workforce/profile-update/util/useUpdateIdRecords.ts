import { usePutIdRecordsMutation } from "@/app/redux/features/updateProfile/api/updateProfileAPI";
import { UseFormGetValues } from "react-hook-form";
import {
  enqueueSuccessSnackbar,
  enqueueWarningSnackbar,
} from "@/app/[lang]/workforce/profile-update/util/notistack";
import { GovernmentSectionType } from "@/app/[lang]/workforce/profile-update/governmentIDs/zodSchema/governmentSchema";

export const useUpdateIdRecords = (
  getValues: UseFormGetValues<GovernmentSectionType>,
) => {
  const [putIdRecords] = usePutIdRecordsMutation();

  return () => {
    putIdRecords(getValues())
      .unwrap()
      .then(() => {
        enqueueSuccessSnackbar("Id Records Updated successfully");
      })
      .catch((error) => {
        enqueueWarningSnackbar(`${error.data.message}`);
      });
  };
};
