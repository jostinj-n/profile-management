import { usePutSeniorityMutation } from "@/app/redux/features/updateProfile/api/updateProfileAPI";
import { UseFormGetValues } from "react-hook-form";
import {
  enqueueSuccessSnackbar,
  enqueueWarningSnackbar,
} from "@/app/[lang]/workforce/profile-update/util/notistack";
import { SenioritySchemaType } from "@/app/[lang]/workforce/profile-update/seniority/zodSchema/senioritySchema";

export const useUpdateSeniority = (
  getValues: UseFormGetValues<SenioritySchemaType>,
) => {
  const [putSeniority] = usePutSeniorityMutation();

  return () => {
    putSeniority(getValues())
      .unwrap()
      .then(() => {
        enqueueSuccessSnackbar("Seniority Updated successfully");
      })
      .catch(() => {
        enqueueWarningSnackbar(`error in seniority`);
      });
  };
};
