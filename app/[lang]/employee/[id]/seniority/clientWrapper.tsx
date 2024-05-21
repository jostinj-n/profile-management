"use client";

import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";
import { fetchEmployeeById } from "@/app/redux/features/employeeSlice";
import {
  EmployeeMenuLabels,
  EmployeeProfileLabels,
  LastUpdateLabels,
  SeniorityDetailLabels,
} from "@/dictionaries/dictionaries";
import { ProfileMenu } from "@/app/component/ProfileMenu";
import { EmployeeSideBar } from "@/app/component/EmployeeSideBar";

import { Grid, Stack } from "@mui/material";

import { Seniority } from "./Seniority";

type Props = {
  id: string;
  profileLabels: EmployeeProfileLabels;
  menuLabels: EmployeeMenuLabels;
  seniorityLabels: SeniorityDetailLabels;
  lastUpdateLabels: LastUpdateLabels;
};

export const ClientWrapper: FC<Props> = ({
  id,
  menuLabels,
  profileLabels,
  seniorityLabels,
  lastUpdateLabels,
}) => {
  const [tab] = useState<number>(4);
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
          <Seniority
            employeeId={id}
            seniorityLabels={seniorityLabels}
            lastUpdateLabels={lastUpdateLabels}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};
