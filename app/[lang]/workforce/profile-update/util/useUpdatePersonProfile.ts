import { usePutPersonProfileMutation } from "@/app/redux/features/updateProfile/api/updateProfileAPI";
import { PersonProfileType } from "@/app/[lang]/workforce/profile-update/personProfile/zodSchema/personProfileSchema";
import { UseFormGetValues } from "react-hook-form";
import {
  enqueueSuccessSnackbar,
  enqueueWarningSnackbar,
} from "@/app/[lang]/workforce/profile-update/util/notistack";

export const useHandleUpdate = (
  getValues: UseFormGetValues<PersonProfileType>,
) => {
  const [putPersonProfile] = usePutPersonProfileMutation();

  return () => {
    putPersonProfile(getValues())
      .unwrap()
      .then(() => {
        enqueueSuccessSnackbar("Profile Updated successfully");
      })
      .catch((error) => {
        enqueueWarningSnackbar(`${error.data.message}`);
      });
  };
};
