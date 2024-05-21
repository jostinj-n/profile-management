"use client";

import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";
import {
  BankDetailLabels,
  EmployeeMenuLabels,
  EmployeeProfileLabels,
  EmploymentDocumentCardLabels,
  PersonalDetailLabels,
} from "@/dictionaries/dictionaries";
import { ProfileMenu } from "@/app/component/ProfileMenu";
import { PersonalDetails } from "@/app/[lang]/employee/[id]/personal/PersonalDetails";
import { Grid, Stack } from "@mui/material";
import { EmployeeSideBar } from "@/app/component/EmployeeSideBar";
import { fetchEmployeeById } from "@/app/redux/features/employeeSlice";

type Props = {
  id: string;
  menuLabels: EmployeeMenuLabels;
  profileLabels: EmployeeProfileLabels;
  personalDetailLabels: PersonalDetailLabels;
  documentDetailCardLabels: EmploymentDocumentCardLabels;
  bankDetailLabels: BankDetailLabels;
};

export const ClientWrapper: FC<Props> = ({
  id,
  menuLabels,
  profileLabels,
  personalDetailLabels,
  documentDetailCardLabels,
  bankDetailLabels,
}) => {
  const dispatch = useAppDispatch();
  const { employee, isLoading, error } = useAppSelector(
    (state: RootState) => state.employee,
  );
  const [tab] = useState<number>(3);

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
          <PersonalDetails
            bankDetailLabels={bankDetailLabels}
            documentDetailCardLabels={documentDetailCardLabels}
            personalDetailLabels={personalDetailLabels}
            employeeId={id}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};
