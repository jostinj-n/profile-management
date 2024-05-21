import React, { FC, useEffect } from "react";
import { Grid, Stack } from "@mui/material";
import { EmployeeProfile } from "@/app/types/employee";
import { EmployeeProfileCard } from "./EmployeeProfileCard";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Dictionary } from "@/dictionaries/dictionaries";
import { fetchEmployeeById } from "../../../redux/features/employeeSlice";
import { RootState } from "../../../redux/store";
import { ProfileMenu } from "@/app/component/ProfileMenu";
import { EmployeeSideBar } from "@/app/component/EmployeeSideBar";

type Props = {
  menuLabels: Dictionary["employee"]["menu"];
  profileLabels: Dictionary["employee"]["profile"];
  employeeProfileCardLabels: Dictionary["employee"]["profileCard"];
  employmentInformationLabels: Dictionary["employee"]["employmentInformation"];
  employeeId: string;
};

export const EmployeePersonProfile: FC<Props> = ({
  menuLabels,
  employeeId,
  profileLabels,
  employeeProfileCardLabels,
}) => {
  const dispatch = useAppDispatch();
  const { employee, isLoading, error } = useAppSelector(
    (state: RootState) => state.employee,
  );
  const tab = 0;

  useEffect(() => {
    dispatch(fetchEmployeeById(employeeId));
  }, [dispatch, employeeId]);

  const profile: EmployeeProfile = {
    resourceType: employee.resource_type,
    firstName: employee.first_name,
    middleName: employee.middle_name,
    lastName: employee.last_name,
    preferredName: employee.preferred_name,
    gender: employee.gender,
    imageDate: "",
    formerFirstName: employee.former_first_name,
    formerLastName: employee.former_last_name,
    species: employee.species,
    notes: employee.notes,
  };

  if (isLoading || error) {
    return (
      <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
      </div>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid xs={3} marginTop={7} item>
        <EmployeeSideBar employee={employee} labels={profileLabels} />
      </Grid>

      <Grid xs={9} marginTop={5} item>
        <ProfileMenu
          selectedTab={tab}
          employeeId={employeeId}
          labels={menuLabels}
        />

        <Stack marginTop={5}>
          <EmployeeProfileCard
            labels={employeeProfileCardLabels}
            profile={profile}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};
