"use client";

import React, { useEffect } from "react";

import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";

import TableCell from "@mui/material/TableCell";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { useGetGroupingsQuery } from "@/app/redux/features/seniority/templateApi";
import { GroupingRow } from "@/app/types/templates";
import { Dictionary } from "@/dictionaries/dictionaries";

import { getHeadCells } from "./GroupingTableHeader";
import { TableHeader } from "../table/table-header";
import { TableGWPagination } from "../table/table-pagination";
import { setRequestParams } from "@/app/redux/features/seniority/requestParamsSlice";
import ErrorHelper from "../handleError/ErrorHelper";
import GroupingAction from "./GroupingAction";

import GroupingSort from "./GroupingSort";
import { requestParamsInitial } from "@/app/types/request";
import { createSelector } from "reselect";
import { RootState } from "@/app/redux/store";

const groupingTableSelector = createSelector(
  (state: RootState) => state.requestParams,
  (state: RootState) => state.groupingRequest,
  (requestParams, groupingRequest) => {
    const groupingRequestParam = { ...groupingRequest, ...requestParams };
    return {
      groupingRequestParam,
      requestParams,
    };
  },
);
type Props = {
  seniority: Dictionary["workforce"]["seniority"];
};

export default function GroupingTable({ seniority }: Readonly<Props>) {
  const dispatch = useAppDispatch();

  const { groupingRequestParam } = useAppSelector(groupingTableSelector);
  const { data, error, isLoading } = useGetGroupingsQuery(groupingRequestParam);

  useEffect(() => {
    dispatch(
      setRequestParams({
        ...requestParamsInitial,
      }),
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
          <TableHeader
            headCells={getHeadCells(seniority.template.list.column)}
          />
          <TableBody>
            {data.items.map((row: GroupingRow) => {
              return (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={row.templateId}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell component="th">{row.templateName}</TableCell>
                  <TableCell>{row.companyName}</TableCell>
                  <TableCell>{row.divisionName}</TableCell>
                  <TableCell>
                    {row.departments.map((item) => item.name).join(",")}
                  </TableCell>
                  <TableCell>
                    {row.workLocations?.map((item) => item.name).join(",")}
                  </TableCell>
                  <TableCell>{row.reportTypeName}</TableCell>
                  <TableCell>
                    <GroupingSort
                      groupingRow={row}
                      seniorityTemplateList={seniority.template.list}
                    />
                  </TableCell>
                  <TableCell>
                    <GroupingAction groupingRow={row} seniority={seniority} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TableGWPagination total={data.total} seniority={seniority} />
    </Box>
  );
}
