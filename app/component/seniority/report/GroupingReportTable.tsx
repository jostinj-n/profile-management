"use client";

import React, { useEffect } from "react";

import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";

import TableCell from "@mui/material/TableCell";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { Dictionary } from "@/dictionaries/dictionaries";

import { getHeadCells } from "./GroupingReportTableHeader";

import { setRequestParams } from "@/app/redux/features/seniority/requestParamsSlice";
import ErrorHelper from "../../handleError/ErrorHelper";
import { TableHeader } from "../../table/table-header";
import { TableGWPagination } from "../../table/table-pagination";
import { useGetSeniorityQuery } from "@/app/redux/features/seniority/groupingReportApi";
import {
  GroupingReportApiRequest,
  GroupingReportRow,
  groupingSelectedToGroupingReportApiRequest,
} from "@/app/types/seniority";
import { createSelector } from "reselect";
import { RootState } from "@/app/redux/store";
import { requestParamsInitial } from "@/app/types/request";

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
  seniority: Dictionary["workforce"]["seniority"];
};

export default function GroupingReportTable({ seniority }: Readonly<Props>) {
  const dispatch = useAppDispatch();

  const { groupingsReportApiRequest } = useAppSelector(
    groupingReportTableSelector
  );
  const { data, error, isLoading } = useGetSeniorityQuery(
    groupingsReportApiRequest
  );
  useEffect(() => {
    dispatch(
      setRequestParams({
        ...requestParamsInitial,
      })
    );
  }, [dispatch]);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    return <ErrorHelper error={error} />;
  }

  return (
    <Box>
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={"medium"}
        >
          <TableHeader headCells={getHeadCells(seniority.person)} />
          <TableBody>
            {data.items.map((row: GroupingReportRow) => {
              return (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={row.employmentDetailId}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell component="th">{row.employeeNumber}</TableCell>
                  <TableCell>{row.lms}</TableCell>
                  <TableCell>{row.fullName}</TableCell>
                  <TableCell>{row.seniorityRank}</TableCell>
                  <TableCell>{row.statusClassification}</TableCell>
                  <TableCell>{row.wlsDate}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {data.items.length > 0 && (
        <TableGWPagination total={data.total} seniority={seniority} />
      )}
    </Box>
  );
}
