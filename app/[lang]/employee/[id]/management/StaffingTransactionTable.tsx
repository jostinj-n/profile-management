"use client";

import { FC, useEffect, useState } from "react";
import {
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { fetchStaffingTransactionsByEmployeeId } from "@/app/redux/features/StaffingTransactionSlice";
import { useAppDispatch } from "@/app/redux/hooks";
import { Dictionary } from "@/dictionaries/dictionaries";
import { changePage } from "@/app/redux/features/EmployeeStaffingTransactionTableSlice";
import { MoreHorizOutlined, PrintOutlined } from "@mui/icons-material";
import Paginator from "@/app/component/Paginator";

type Props = {
  employeeId: string;
  labels: Dictionary["employee"]["employeeStaffingTransactionsTable"];
};

export const StaffingTransactionTable: FC<Props> = ({ labels, employeeId }) => {
  const dispatch = useAppDispatch();
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [openRowMenu, setOpenRowMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { transactions, isLoading, error, total } = useSelector(
    (state: RootState) => state.employeeStaffingTransaction,
  );
  const { pagination } = useSelector(
    (state: RootState) => state.employeeStaffingTransactionTable,
  );

  useEffect(() => {
    dispatch(fetchStaffingTransactionsByEmployeeId(employeeId));
  }, [dispatch, employeeId, pagination]);

  const openTransaction = (recordId: number) => {
    console.log("open transaction", recordId);
  };

  const printTransaction = (recordId: number) => {
    console.log("print transaction", recordId);
  };

  const onPrintClick = () => {
    if (selectedRow) {
      printTransaction(selectedRow);
    }
    setOpenRowMenu(false);
  };

  const onOpenMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    recordId: number,
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedRow(recordId);
    setOpenRowMenu(true);
  };

  if (isLoading || error) {
    return (
      <Stack>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
      </Stack>
    );
  }

  return (
    <Stack
      direction="column"
      justifyContent="flex-end"
      alignItems="flex-start"
      spacing={10}
    >
      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="left">{labels.columns.effectiveDate}</TableCell>
              <TableCell align="left">{labels.columns.purpose}</TableCell>
              <TableCell align="left">
                {labels.columns.employementRecord}
              </TableCell>
              <TableCell align="left">
                {labels.columns.dateExpectedToReturn}
              </TableCell>
              <TableCell align="left">{labels.columns.approvedBy}</TableCell>
              <TableCell align="left">{labels.columns.explanation}</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row) => (
              <TableRow
                hover
                onClick={() => openTransaction(row.recordId)}
                key={row.recordId}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
              >
                <TableCell align="left">{row.effectiveDate}</TableCell>
                <TableCell align="left">{row.purpose}</TableCell>
                <TableCell align="left">{row.employmentRecord}</TableCell>
                <TableCell align="left">{row.dateExpectedToReturn}</TableCell>
                <TableCell align="left">{row.approvedBy}</TableCell>
                <TableCell align="left">{row.explanation}</TableCell>
                <TableCell align="left">
                  <IconButton onClick={(e) => onOpenMenu(e, row.recordId)}>
                    <MoreHorizOutlined />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <Menu
              open={openRowMenu}
              anchorEl={anchorEl}
              onClose={() => setOpenRowMenu(false)}
            >
              <MenuItem onClick={onPrintClick}>
                <PrintOutlined color="primary" sx={{ marginRight: "0.5em" }} />{" "}
                {labels.actions.printPDF}
              </MenuItem>
            </Menu>
          </TableBody>
        </Table>
      </TableContainer>

      <Stack width={"100%"} alignItems={"flex-start"}>
        <Divider flexItem />

        <Paginator
          labelForRows={labels.labelForRows}
          page={pagination.skip}
          total={total}
          onChangePage={(newPage) => dispatch(changePage(newPage))}
        />
      </Stack>
    </Stack>
  );
};
