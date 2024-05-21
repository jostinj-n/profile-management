"use client";

import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";
import { Grid, Stack } from "@mui/material";
import { fetchEmployeeById } from "@/app/redux/features/employeeSlice";
import {
  CompensationLabels,
  EmployeeMenuLabels,
  EmployeeProfileLabels,
} from "@/dictionaries/dictionaries";
import { ProfileMenu } from "@/app/component/ProfileMenu";
import { EmployeeSideBar } from "@/app/component/EmployeeSideBar";
import { CompensationDetailsCard } from "./CompensationDetailsCard";

type Props = {
  id: string;
  menuLabels: EmployeeMenuLabels;
  profileLabels: EmployeeProfileLabels;
  labels: CompensationLabels;
};

export const ClientWrapper: FC<Props> = ({
  id,
  profileLabels,
  menuLabels,
  labels,
}) => {
  const [tab] = useState<number>(5);
  const dispatch = useAppDispatch();
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
    <Grid container spacing={2}>
      <Grid xs={3} marginTop={7} item>
        <EmployeeSideBar employee={employee} labels={profileLabels} />
      </Grid>

      <Grid xs={9} marginTop={5} item>
        <ProfileMenu selectedTab={tab} employeeId={id} labels={menuLabels} />

        <Stack marginTop={5}>
          <CompensationDetailsCard employeeId={id} labels={labels} />
        </Stack>
      </Grid>
    </Grid>
  );
};
