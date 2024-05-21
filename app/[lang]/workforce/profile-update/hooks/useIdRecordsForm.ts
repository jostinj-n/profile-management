import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  governmentSchema,
  GovernmentSectionType,
} from "@/app/[lang]/workforce/profile-update/governmentIDs/zodSchema/governmentSchema";
import { useLazyIdRecordsProfileUpdateQuery } from "@/app/redux/features/updateProfile/api/IdRecordsAPI";

export const useIdRecordsForm = (id: string) => {
  const [getIdRecords] = useLazyIdRecordsProfileUpdateQuery();

  const {
    control,
    formState: { errors },
    getValues,
  } = useForm<GovernmentSectionType>({
    mode: "onBlur",
    resolver: zodResolver(governmentSchema),
    defaultValues: () => getIdRecords(id).unwrap(),
  });

  return {
    idRecords: {
      control: control,
      errors: errors,
      getValues: getValues,
    },
  };
};
