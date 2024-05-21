"use client";

import { FC, useEffect, useState } from "react";
import {
  EmployeeMenuLabels,
  EmployeeProfileLabels,
  EmploymentDetailsCardLabels,
  SpecializedEmploymentDetailsCardLabels,
} from "@/dictionaries/dictionaries";
import { ProfileMenu } from "@/app/component/ProfileMenu";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { EmploymentDetails } from "./EmploymentDetails";
import { Grid, Stack } from "@mui/material";
import { RootState } from "@/app/redux/store";
import { EmployeeSideBar } from "@/app/component/EmployeeSideBar";
import { fetchEmployeeById } from "@/app/redux/features/employeeSlice";

type Props = {
  id: string;
  menuLabels: EmployeeMenuLabels;
  profileLabels: EmployeeProfileLabels;
  employmentDetailsCardLabels: EmploymentDetailsCardLabels;
  specializedEmploymentDetailsCardLabels: SpecializedEmploymentDetailsCardLabels;
};

export const ClientWrapper: FC<Props> = ({
  id,
  menuLabels,
  profileLabels,
  employmentDetailsCardLabels,
  specializedEmploymentDetailsCardLabels,
}) => {
  const dispatch = useAppDispatch();
  const { employee, isLoading, error } = useAppSelector(
    (state: RootState) => state.employee,
  );
  const [tab] = useState<number>(1);

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
    <div className="mr-5 ml-5">
      <Grid container spacing={2}>
        <Grid xs={3} marginTop={7} item>
          <EmployeeSideBar employee={employee} labels={profileLabels} />
        </Grid>

        <Grid xs={9} marginTop={5} item>
          <ProfileMenu selectedTab={tab} employeeId={id} labels={menuLabels} />

          <Stack marginTop={5}>
            <EmploymentDetails
              employeeId={id}
              menuLabels={menuLabels}
              employmentDetailsCardLabels={employmentDetailsCardLabels}
              specializedEmploymentDetailsCardLabels={
                specializedEmploymentDetailsCardLabels
              }
            />
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};
