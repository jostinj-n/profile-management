import { useGetFilterQuery } from "@/app/redux/features/seniority/filtersApi";
import { SelectDataControl } from "./SelectDataControl";
import { FilterResponse } from "@/app/api/seniority/filters/[name]/route";
import { FieldErrors, FieldValues, UseControllerProps } from "react-hook-form";
import Skeleton from "@mui/material/Skeleton";

type Form<T extends FieldValues> = {
  errors: FieldErrors<T>;
  inputLabel: string;
  required?: boolean;
  filterName: string;
  field?: string;
} & UseControllerProps<T>;

export const SelectRefStringDataComponent = <T extends FieldValues>({
  control,
  errors,
  name,
  inputLabel,
  filterName,
  field = "name",
}: Form<T>) => {
  const { data, isLoading } = useGetFilterQuery(filterName);
  if (isLoading) return <Skeleton variant="rounded" width={300} height={60} />;
  return (
    <SelectDataControl
      required
      control={control}
      errors={errors}
      name={name}
      data={
        (data as FilterResponse[])?.map((item) =>
          String(item[field as keyof FilterResponse])
        ) || []
      }
      inputLabel={inputLabel}
    />
  );
};

export default SelectRefStringDataComponent;
