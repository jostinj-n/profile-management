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
import { fetchProfileUpdateAuditsByEmployeeId } from "@/app/redux/features/ProfileUpdateAuditSlice";
import { useAppDispatch } from "@/app/redux/hooks";
import { Dictionary } from "@/dictionaries/dictionaries";
import { changePage } from "@/app/redux/features/profileUpdateAuditTableSlice";
import { MoreHorizOutlined, PrintOutlined } from "@mui/icons-material";
import Paginator from "@/app/component/Paginator";

type Props = {
  employeeId: string;
  labels: Dictionary["employee"]["profileUpdateAuditTable"];
};

export const ProfileUpdateAuditTable: FC<Props> = ({ labels, employeeId }) => {
  const dispatch = useAppDispatch();
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [openRowMenu, setOpenRowMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { records, isLoading, error, total } = useSelector(
    (state: RootState) => state.profileUpdateAudit,
  );
  const { pagination } = useSelector(
    (state: RootState) => state.profileUpdateAuditTable,
  );

  useEffect(() => {
    dispatch(fetchProfileUpdateAuditsByEmployeeId(employeeId));
  }, [dispatch, employeeId, pagination]);

  const openRecord = (editLogId: number) => {
    console.log("open record", editLogId);
  };

  const printRecord = (editLogId: number) => {
    console.log("print record", editLogId);
  };

  const onPrintClick = () => {
    if (selectedRow !== null) {
      printRecord(selectedRow);
    }

    setSelectedRow(null);
    setOpenRowMenu(false);
  };

  const onOpenMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    editLogId: number,
  ) => {
    event.stopPropagation();

    setAnchorEl(event.currentTarget);
    setSelectedRow(editLogId);
    setOpenRowMenu(true);
  };

  const getRequestType = (type: string) => {
    switch (type) {
      case "contact_detail":
        return labels.informationTypes.contact;
      case "person_profile":
        return labels.informationTypes.profile;
      case "banking_information":
        return labels.informationTypes.bank;
      case "seniority":
        return labels.informationTypes.seniority;
      case "government_id":
        return labels.informationTypes.identifier;
      case "employment_detail":
        return labels.informationTypes.employment;
      default:
        return labels.informationTypes.unknown;
    }
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
              <TableCell align="left">{labels.columns.updatedBy}</TableCell>
              <TableCell align="left">
                {labels.columns.informationType}
              </TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((row) => (
              <TableRow
                hover
                onClick={() => openRecord(row.editLogId)}
                key={row.editLogId}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
              >
                <TableCell align="left">{row.effectiveDate}</TableCell>
                <TableCell align="left">{row.updatedBy}</TableCell>
                <TableCell align="left">
                  {getRequestType(row.editRequestType)}
                </TableCell>
                <TableCell align="left">
                  <IconButton onClick={(e) => onOpenMenu(e, row.editLogId)}>
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
