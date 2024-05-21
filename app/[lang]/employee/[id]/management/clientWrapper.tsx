"use client";

import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";
import { Button, ButtonGroup, Grid } from "@mui/material";
import { ProfileMenu } from "@/app/component/ProfileMenu";
import { fetchEmployeeById } from "@/app/redux/features/employeeSlice";
import {
  ButtonLabels,
  EmployeeMenuLabels,
  EmployeeProfileLabels,
  EmployeeStaffingTransactionTableLabels,
  ProfileManagementPageLabels,
  ProfileUpdateAuditTableLabels,
} from "@/dictionaries/dictionaries";
import { EmployeeSideBar } from "@/app/component/EmployeeSideBar";
import { StaffingTransactionTable } from "./StaffingTransactionTable";
import { ProfileUpdateAuditTable } from "./ProfileUpdateAuditTable";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { UpdateProfileModal } from "@/app/component/profileUpdate/updateProfileModal";

type Props = {
  id: string;
  buttonLabels: ButtonLabels;
  menuLabels: EmployeeMenuLabels;
  profileLabels: EmployeeProfileLabels;
  labels: ProfileManagementPageLabels;
  stfTableLabels: EmployeeStaffingTransactionTableLabels;
  profileUpdateAuditTableLabels: ProfileUpdateAuditTableLabels;
};

export const ClientWrapper: FC<Props> = ({
  id,
  buttonLabels,
  profileLabels,
  labels,
  stfTableLabels,
  profileUpdateAuditTableLabels,
  menuLabels,
}) => {
  const dispatch = useAppDispatch();
  const [activeTable, setActiveTable] = useState(0);
  const [tab] = useState<number>(6);
  const [isOpen, setOpenModal] = useState(false);
  const open = () => {
    setOpenModal(true);
  };
  const close = () => {
    setOpenModal(false);
  };
  const { employee, isLoading, error } = useAppSelector(
    (state: RootState) => state.employee,
  );

  useEffect(() => {
    dispatch(fetchEmployeeById(id));
  }, [dispatch, id]);

  if (isLoading || error) {
    return (
      <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
      </div>
    );
  }

  return (
    <Grid container>
      <Grid xs={3} marginTop={7} item>
        <EmployeeSideBar employee={employee} labels={profileLabels} />
      </Grid>

      <Grid xs={9} marginTop={5} item>
        <ProfileMenu selectedTab={tab} employeeId={id} labels={menuLabels} />

        <Grid container marginTop={5} marginBottom={5}>
          <Grid item xs={6}>
            <ButtonGroup>
              <Button
                disableElevation
                variant={activeTable === 0 ? "outlined" : "contained"}
                color={activeTable === 0 ? "primary" : "inherit"}
                size="medium"
                onClick={() => setActiveTable(0)}
              >
                {labels.navTabStaffingTransactions}
              </Button>

              <Button
                disableElevation
                variant={activeTable === 1 ? "outlined" : "contained"}
                color={activeTable === 1 ? "primary" : "inherit"}
                size="medium"
                onClick={() => setActiveTable(1)}
              >
                {labels.navTabProfileUpdates}
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={6} textAlign="right">
            {activeTable === 0 && (
              <Button variant="contained" onClick={open} disableElevation>
                <BorderColorOutlinedIcon sx={{ marginRight: "0.5em" }} />
                {buttonLabels.create}
              </Button>
            )}

            {activeTable === 1 && (
              <Button variant="contained" onClick={open} disableElevation>
                <BorderColorOutlinedIcon sx={{ marginRight: "0.5em" }} />
                {buttonLabels.edit}
              </Button>
            )}
          </Grid>
        </Grid>
        {activeTable === 0 && (
          <StaffingTransactionTable labels={stfTableLabels} employeeId={id} />
        )}
        <UpdateProfileModal
          labels={profileLabels}
          isOpen={isOpen}
          onClose={close}
          id={id}
        />

        {activeTable === 1 && (
          <ProfileUpdateAuditTable
            labels={profileUpdateAuditTableLabels}
            employeeId={id}
          />
        )}
      </Grid>
    </Grid>
  );
};
