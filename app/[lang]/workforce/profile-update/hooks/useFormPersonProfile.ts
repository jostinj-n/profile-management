import { useForm } from "react-hook-form";
import {
  personProfileSchema,
  PersonProfileType,
} from "@/app/[lang]/workforce/profile-update/personProfile/zodSchema/personProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useLazyGetEmployeeForProfileUpdateQuery } from "@/app/redux/features/updateProfile/api/employeeAPI";

export const usePersonProfileForm = (id: string) => {
  const [getProfileUpdate] = useLazyGetEmployeeForProfileUpdateQuery();

  const {
    control: personProfileControl,
    formState: {
      errors: personProfileErrors,
      isValid: isProfileFormValid,
      isDirty: personProfileDirty,
    },
    getValues: getProfileValues,
  } = useForm<PersonProfileType>({
    mode: "onBlur",
    resolver: zodResolver(personProfileSchema),
    defaultValues: () =>
      getProfileUpdate(id)
        .unwrap()
        .then((data) => ({ ...data, dateOfBirth: dayjs(data.dateOfBirth) })),
  });

  return {
    profileForm: {
      control: personProfileControl,
      errors: personProfileErrors,
      getValues: getProfileValues,
      isValid: isProfileFormValid,
      isDirty: personProfileDirty,
    },
  };
};
