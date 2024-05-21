"use client";

import { FC, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Checkbox } from "@mui/material";
import Link from "next/link";
// import EmployeeStatusChip from "./EmployeeStatusChip";
import Paginator from "./Paginator";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchEmployees } from "@/app/redux/features/employeesSlice";
import { useAppDispatch } from "@/app/redux/hooks";
import { Dictionary } from "@/dictionaries/dictionaries";
import { nextPage } from "@/app/redux/features/employeeTableSlice";

type Props = {
  tableLabels: Dictionary["employee"]["table"];
};

export const EmployeesTable: FC<Props> = ({ tableLabels }) => {
  const dispatch = useAppDispatch()
  const { employees, isLoading, error, total} = useSelector((state: RootState) => state.employees)
  const { filters, pagination } = useSelector((state: RootState) => state.employeeTable)

  useEffect(() => {
    dispatch(fetchEmployees())
  }, [dispatch, filters, pagination])

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label={tableLabels.label}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{tableLabels.columns.name}</TableCell>
              <TableCell align="right">{tableLabels.columns.employeeNumber}</TableCell>
              <TableCell align="right">{tableLabels.columns.lmsNumber}</TableCell>
              <TableCell align="right">{tableLabels.columns.workLocation}</TableCell>
              <TableCell align="right">{tableLabels.columns.department}</TableCell>
              <TableCell align="right">{tableLabels.columns.employmentStatus}</TableCell>
              <TableCell align="right">{tableLabels.columns.status}</TableCell>
              <TableCell align="right">{tableLabels.columns.bilingual}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((row) => (
              <TableRow
                key={row.person_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell component="th" scope="row">
                  <Link href={{ pathname: `/employee/${row.person_id}/` }}>
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={`https://i.pravatar.cc/150?img=${row.person_id}`}
                      />
                      <span style={{ marginLeft: "10px" }}>
                        {row.preferred_name ? row.preferred_name: row.first_name} {row.last_name}
                      </span>
                    </span>
                  </Link>
                </TableCell>
                <TableCell align="right">{row.employee_number}</TableCell>
                <TableCell align="right">{row.lms}</TableCell>
                <TableCell align="right">{row.work_location}</TableCell>
                <TableCell align="right">{row.department}</TableCell>
                <TableCell align="right">
                  {row.job_status}
                  {/* <EmployeeStatusChip status={row.job_status} /> */}
                </TableCell>
                <TableCell align="right">{row.employment_status}</TableCell>
                <TableCell align="right">{row.bilingual ? tableLabels.bilingualYes : tableLabels.bilingualNo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "1em",
        }}
      >
        <Paginator
          page={pagination.skip}
          total={total}
          onChangePage={(newPage) => {dispatch(nextPage(newPage))}}
        />
      </div>
    </div>
  );
}
