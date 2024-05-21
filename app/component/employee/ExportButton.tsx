import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { useAppSelector } from "@/app/redux/hooks";
import { useLazyDownloadCsvQuery } from "@/app/redux/features/employee/employeeApi";
import { createSelector } from "reselect";
import { RootState } from "@/app/redux/store";

export type EmployeeFilterExport = {
  company_list?: string[];
  division_list?: string[];
  department_list?: string[];
  employee_status_list?: string[];
  language_list?: string[];
  location_list?: string[];
  status_classification_list?: string[];
  text_query_param?: string;
  include_protected_inactive_only?: boolean;
  is_union?: boolean;
};

const exportButtonDataSelector = createSelector(
  (state: RootState) => state.employeeTable.filters,
  (filters) => {
    return { filters };
  }
);

type Props = {
  label: string;
};

export default function ExportButton({ label }: Readonly<Props>) {
  const { filters } = useAppSelector(exportButtonDataSelector);

  const [downloadCsv, { isLoading }] = useLazyDownloadCsvQuery();

  const mapFilterList = (filterList: number[]) =>
    filterList.length < 1
      ? undefined
      : filterList.map((item) => item.toString());

  const handleDownload = () => {
    downloadCsv({
      company_list: mapFilterList(filters.companies),
      division_list: mapFilterList(filters.divisions),
      department_list: mapFilterList(filters.departments),
      employee_status_list: mapFilterList(filters.employmentStatus),
      language_list: mapFilterList(filters.languages),
      location_list: mapFilterList(filters.locations),
      status_classification_list: mapFilterList(filters.statusClassifications),
      text_query_param: filters.search ?? undefined,
      include_protected_inactive_only:
        filters.includeProtectedInactiveOnly ?? undefined,
    });
  };
  return (
    <LoadingButton
      loading={isLoading}
      loadingPosition="start"
      startIcon={<SaveAltIcon />}
      variant="text"
      onClick={handleDownload}
      color="secondary"
    >
      {label}
    </LoadingButton>
  );
}
