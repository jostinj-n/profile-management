"use client";
import { FC } from "react";
import {
  ButtonLabels,
  EmployeeFilterLabels,
  EmployeeListPageLabels,
  EmployeeTableLabels,
  ExportEmployeesModalLabels,
} from "@/dictionaries/dictionaries";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { EmployeesTable } from "@/app/component/EmployeesTable";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import ExportButton from "@/app/component/employee/ExportButton";

type Props = {
  labels: EmployeeListPageLabels;
  tableLabels: EmployeeTableLabels;
  filterLabels: EmployeeFilterLabels;
  buttonLabels: ButtonLabels;
  exportEmployeesModalLabels: ExportEmployeesModalLabels;
};

export const ClientWrapper: FC<Props> = ({
  labels,
  filterLabels,
  buttonLabels,
  tableLabels,
}) => {
  const { total } = useSelector((state: RootState) => state.employees);

  return (
    <Stack
      spacing={{ xs: 1, sm: 2 }}
      direction="row"
      useFlexGap
      flexWrap="wrap"
    >
      <Stack flexGrow={"1"} spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5">{labels.title}</Typography>
          <Button variant="contained" href={"/workforce/create-profile"}>
            <Add className="mr-2" /> {buttonLabels.createProfile}
          </Button>
        </Stack>
        <Paper
          elevation={0}
          className="bg-gray-100 width-100 mb-5 items-center flex justify-between"
          style={{ height: "70px" }}
        >
          <Stack ml={2}>
            <Typography variant="body1">
              {total} {filterLabels.results}
            </Typography>
          </Stack>
          <Stack mr={2}>
            <ExportButton label={buttonLabels.export} />
          </Stack>
        </Paper>
        <EmployeesTable tableLabels={tableLabels} />
      </Stack>
    </Stack>
  );
};
