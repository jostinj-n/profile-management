import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLazyContactDetailsProfileUpdateQuery } from "@/app/redux/features/updateProfile/api/contactDetailsAPI";
import {
  contactDetailsSchema,
  ContactDetailsType,
} from "@/app/[lang]/workforce/profile-update/contactDetails/zodSchema/contactDetailsSchema";

export const useContactDetailsForm = (id: string) => {
  const [getContactDetails] = useLazyContactDetailsProfileUpdateQuery();

  const {
    control: contactDetailsControl,
    formState: { errors: contactDetailsErrors, isValid },
    getValues,
  } = useForm<ContactDetailsType>({
    mode: "onBlur",
    resolver: zodResolver(contactDetailsSchema),
    defaultValues: () => getContactDetails(id).unwrap(),
  });

  return {
    contactForm: {
      control: contactDetailsControl,
      errors: contactDetailsErrors,
      getValues: getValues,
      isValid: isValid,
    },
  };
};
