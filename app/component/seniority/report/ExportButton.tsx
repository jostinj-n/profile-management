import React from "react";
import { Dictionary } from "@/dictionaries/dictionaries";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { useAppSelector } from "@/app/redux/hooks";
import {
  GroupingReportApiRequest,
  groupingSelectedToGroupingReportApiRequest,
} from "@/app/types/seniority";
import { useLazyDownloadCsvQuery } from "@/app/redux/features/seniority/groupingReportApi";
import { createSelector } from "reselect";
import { RootState } from "@/app/redux/store";

const exportButtonDataSelector = createSelector(
  (state: RootState) => state.groupingSelected,
  (groupingSelected) => {
    const groupingsReportApiRequest: GroupingReportApiRequest = {
      ...groupingSelectedToGroupingReportApiRequest(groupingSelected, true),
      template_name: groupingSelected.templateName,
    };
    return {
      groupingsReportApiRequest,
    };
  },
);

type Props = {
  seniorityTemplateList: Dictionary["workforce"]["seniority"]["template"]["list"];
};

export default function ExportButton({
  seniorityTemplateList,
}: Readonly<Props>) {
  const { groupingsReportApiRequest } = useAppSelector(
    exportButtonDataSelector
  );
  const [downloadCsv, { isLoading }] = useLazyDownloadCsvQuery();

  const handleDownload = () => {
    // Trigger the mutation when the button is clicked
    downloadCsv({
      ...groupingsReportApiRequest,
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
      {seniorityTemplateList.export}
    </LoadingButton>
  );
}
