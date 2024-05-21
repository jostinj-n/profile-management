"use client";

import React from "react";

import { Dictionary } from "@/dictionaries/dictionaries";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { gardaTheme } from "@/app/muiTheme/theme";
import Typography from "@mui/material/Typography";
import ExportButton from "./ExportButton";
import { useAppSelector } from "@/app/redux/hooks";
import { createSelector } from "reselect";
import { RootState } from "@/app/redux/store";
import {
  GroupingReportApiRequest,
  groupingSelectedToGroupingReportApiRequest,
} from "@/app/types/seniority";
import { useGetSeniorityQuery } from "@/app/redux/features/seniority/groupingReportApi";

const groupingReportTableSelector = createSelector(
  (state: RootState) => state.requestParams,
  (state: RootState) => state.groupingSelected,
  (requestParams, groupingSelected) => {
    const groupingsReportApiRequest: GroupingReportApiRequest = {
      ...groupingSelectedToGroupingReportApiRequest(groupingSelected, false),
      ...requestParams,
    };
    return {
      groupingsReportApiRequest,
      requestParams,
    };
  }
);

type Props = {
  seniorityTemplateList: Dictionary["workforce"]["seniority"]["template"]["list"];
};

export default function GroupingReportAction({
  seniorityTemplateList,
}: Readonly<Props>) {
  const { groupingsReportApiRequest } = useAppSelector(
    groupingReportTableSelector
  );
  const { data } = useGetSeniorityQuery(groupingsReportApiRequest);
  return (
    <Box>
      <Toolbar
        sx={{
          backgroundColor: gardaTheme.palette.coolGrey.light,
        }}
      >
        <Typography
          sx={{ flex: "1 1 100%" }}
          className="text-sm"
          id="tableTitle"
          component="div"
        >
          {`${data?.total} ${seniorityTemplateList.result}`}
        </Typography>
        <ExportButton seniorityTemplateList={seniorityTemplateList} />
      </Toolbar>
    </Box>
  );
}
