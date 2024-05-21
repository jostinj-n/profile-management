"use client";

import React, { useEffect } from "react";

import Box from "@mui/material/Box";

import { Dictionary } from "@/dictionaries/dictionaries";
import GroupingReportTable from "./GroupingReportTable";
import GroupingReportFilter from "./GroupingReportFilter";
import GroupingReportHeader from "./GroupingReportHeader";
import GroupingReportAction from "./GroupingReportAction";
import { useAppDispatch } from "@/app/redux/hooks";
import { useSelectGroupingQuery } from "@/app/redux/features/seniority/templateApi";
import { setGroupingSelected } from "@/app/redux/features/seniority/groupingSelectedSlice";

type Props = {
  seniority: Dictionary["workforce"]["seniority"];
  idGrouping: number;
};

export default function Groupings({ seniority, idGrouping }: Readonly<Props>) {
  const dispatch = useAppDispatch();

  const { data: groupingSelected } = useSelectGroupingQuery(idGrouping);
  useEffect(() => {
    if (groupingSelected)
      dispatch(
        setGroupingSelected({
          ...groupingSelected,
        })
      );
  }, [dispatch, groupingSelected]);

  return (
    groupingSelected && (
      <Box>
        <GroupingReportHeader seniorityTemplate={seniority.template} />
        <GroupingReportFilter seniority={seniority} />
        <GroupingReportAction seniorityTemplateList={seniority.template.list} />
        <GroupingReportTable seniority={seniority} />
      </Box>
    )
  );
}
