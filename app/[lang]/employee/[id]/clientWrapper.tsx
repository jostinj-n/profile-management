"use client";

import { FC } from "react";
import { EmployeePersonProfile } from "@/app/[lang]/employee/[id]/EmployeePersonProfile";
import {
  EmployeeMenuLabels,
  EmployeeProfileCardLabels,
  EmployeeProfileLabels,
  EmployemntInformationLabels,
} from "@/dictionaries/dictionaries";

type Props = {
  id: string;
  menuLabels: EmployeeMenuLabels;
  profileLabels: EmployeeProfileLabels;
  employeeProfileCardLabels: EmployeeProfileCardLabels;
  employmentInformationLabels: EmployemntInformationLabels;
};

export const ClientWrapper: FC<Props> = ({
  id,
  menuLabels,
  employeeProfileCardLabels,
  profileLabels,
  employmentInformationLabels,
}) => {
  return (
    <div className="mr-5 ml-5">
      <EmployeePersonProfile
        menuLabels={menuLabels}
        employeeProfileCardLabels={employeeProfileCardLabels}
        profileLabels={profileLabels}
        employmentInformationLabels={employmentInformationLabels}
        employeeId={id}
      />
    </div>
  );
};
