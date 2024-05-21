import { useAppDispatch } from "@/app/redux/hooks";

import { Dictionary } from "@/dictionaries/dictionaries";

import { useGetEmployeeCompensationQuery } from "@/app/redux/features/staffing-transaction/employeeCompensationApi";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { changeView } from "@/app/redux/features/staffing-transaction/parkingChangeSlice";
import BackNextButtons from "../BackNextButtons";
import { EmployeeCompensation } from "@/app/types/employee";
import { updateTransactionDetails } from "@/app/redux/features/staffing-transaction/stfSlice";
import {
  employeeCompensationToParkingChange,
  parkingChangeInitialValue,
} from "./ParkingChangeType";

type Props = {
  staffingTransaction: Dictionary["workforce"]["staffingTransaction"];
  employeeId?: string;
};
export default function ListOfPass({
  staffingTransaction,
  employeeId = "",
}: Readonly<Props>) {
  const dispatch = useAppDispatch();

  const { data } = useGetEmployeeCompensationQuery(employeeId);

  const handlerInitialise = (employeeCompensation: EmployeeCompensation) => {
    dispatch(
      updateTransactionDetails({
        ...employeeCompensationToParkingChange(employeeCompensation),
      }),
    );
    dispatch(changeView({ activeFormView: true }));
  };

  const handlerInitialiseNewPass = () => {
    dispatch(
      updateTransactionDetails({
        ...parkingChangeInitialValue,
      }),
    );
    dispatch(changeView({ activeFormView: true }));
  };

  return (
    <>
      <Stack
        direction="row-reverse"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Button
          variant="contained"
          onClick={handlerInitialiseNewPass}
          size="small"
          startIcon={<AddIcon />}
        >
          {staffingTransaction.transactionDetails.parkingChange.new}
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>
                {
                  staffingTransaction.transactionDetails.parkingChange
                    .parking_pass_type.label
                }
              </TableCell>
              <TableCell align="right">
                {
                  staffingTransaction.transactionDetails.parkingChange
                    .pass_number.label
                }
              </TableCell>
              <TableCell align="right">
                {
                  staffingTransaction.transactionDetails.parkingChange
                    .reimbursement_type.label
                }
              </TableCell>

              <TableCell align="right">
                {
                  staffingTransaction.transactionDetails.parkingChange
                    .effective_from.label
                }
              </TableCell>
              <TableCell align="right">
                {
                  staffingTransaction.transactionDetails.parkingChange
                    .effective_to.label
                }
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.issuedPassType}
                </TableCell>
                <TableCell align="right">{row.passNumber}</TableCell>
                <TableCell align="right">{row.reimbursementType}</TableCell>

                <TableCell align="right">{row.effectiveFrom}</TableCell>
                <TableCell align="right">{row.effectiveTo}</TableCell>
                <TableCell sx={{ width: 10 }}>
                  <Button
                    sx={{ justifyContent: "left" }}
                    fullWidth
                    variant="text"
                    size="small"
                    onClick={() => handlerInitialise(row)}
                    startIcon={<BorderColorIcon color="primary" />}
                    color="secondary"
                  ></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <BackNextButtons
        handleNext={() => dispatch(changeView({ activeFormView: true }))}
        buttonLabels={staffingTransaction.button}
      />
    </>
  );
}
