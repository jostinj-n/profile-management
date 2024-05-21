import { usePutContactDetailsMutation } from "@/app/redux/features/updateProfile/api/updateProfileAPI";
import { UseFormGetValues } from "react-hook-form";
import { ContactDetailsType } from "@/app/[lang]/workforce/profile-update/contactDetails/zodSchema/contactDetailsSchema";
import {
  enqueueSuccessSnackbar,
  enqueueWarningSnackbar,
} from "@/app/[lang]/workforce/profile-update/util/notistack";

export const useUpdateContact = (
  getValues: UseFormGetValues<ContactDetailsType>,
) => {
  const [putContactDetails] = usePutContactDetailsMutation();

  return () => {
    putContactDetails(getValues())
      .unwrap()
      .then(() => {
        enqueueSuccessSnackbar("Contact Updated successfully");
      })
      .catch((error) => {
        enqueueWarningSnackbar(`${error.data.message}`);
      });
  };
};
