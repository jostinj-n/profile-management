"use client";

import React from "react";

import Box from "@mui/material/Box";
import SortIcon from "@mui/icons-material/Sort";

import { Dictionary } from "@/dictionaries/dictionaries";
import { GroupingRow } from "@/app/types/templates";
import { useRouter } from "next/navigation";
import LoadingButton from "@mui/lab/LoadingButton";

type Props = {
  seniorityTemplateList: Dictionary["workforce"]["seniority"]["template"]["list"];
  groupingRow: GroupingRow;
};

export default function GroupingSort({
  seniorityTemplateList,
  groupingRow,
}: Readonly<Props>) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleSelectedGrouping = () => {
    setLoading(true);
    router.push("grouping/report/" + groupingRow.templateId);
  };

  return (
    <Box>
      <LoadingButton
        loading={loading}
        loadingPosition="start"
        startIcon={<SortIcon color="primary" />}
        variant="text"
        onClick={handleSelectedGrouping}
        color="primary"
      >
        {seniorityTemplateList.run}
      </LoadingButton>
    </Box>
  );
}
