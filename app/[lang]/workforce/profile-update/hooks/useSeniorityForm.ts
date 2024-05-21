import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  senioritySchema,
  SenioritySchemaType,
} from "@/app/[lang]/workforce/profile-update/seniority/zodSchema/senioritySchema";
import { useLazyGetSeniorityProfileUpdateQuery } from "@/app/redux/features/updateProfile/api/seniorityAPI";

export const useSeniorityForm = (id: string) => {
  const [getSeniority] = useLazyGetSeniorityProfileUpdateQuery();

  const {
    control,
    formState: { errors, isValid },
    getValues,
  } = useForm<SenioritySchemaType>({
    mode: "onBlur",
    resolver: zodResolver(senioritySchema),
    defaultValues: () => getSeniority(id).unwrap(),
  });
  console.log("VALUES SENIORITY************", getValues());
  return {
    seniorityForm: {
      control: control,
      errors: errors,
      getValues: getValues,
      isValid: isValid,
    },
  };
};
