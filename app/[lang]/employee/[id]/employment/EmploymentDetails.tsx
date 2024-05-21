import { FC, Fragment, useEffect } from "react";
import { Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { fetchEmploymentDetails } from "@/app/redux/features/employmentSlice";
import { RootState } from "../../../../redux/store";
import {
  EmployeeMenuLabels,
  EmploymentDetailsCardLabels,
  SpecializedEmploymentDetailsCardLabels,
} from "@/dictionaries/dictionaries";
import { EmploymentDetailsCard } from "./EmploymentDetailsCard";
import { SpecializedEmploymentDetailsCard } from "./SpecializedEmploymentDetailsCard";

type Props = {
  employeeId: string;
  menuLabels: EmployeeMenuLabels;
  employmentDetailsCardLabels: EmploymentDetailsCardLabels;
  specializedEmploymentDetailsCardLabels: SpecializedEmploymentDetailsCardLabels;
};

export const EmploymentDetails: FC<Props> = ({
  employeeId,
  employmentDetailsCardLabels,
  specializedEmploymentDetailsCardLabels,
}) => {
  const dispatch = useAppDispatch();
  const { employment, isLoading, error } = useAppSelector(
    (state: RootState) => state.employment,
  );

  useEffect(() => {
    dispatch(fetchEmploymentDetails(employeeId));
  }, [dispatch, employeeId]);

  if (isLoading || error) {
    return (
      <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
      </div>
    );
  }

  return (
    <Stack spacing={2}>
      {employment?.employmentDetails?.map((employmentDetail, index) => (
        <Fragment key={index}>
          <EmploymentDetailsCard
            employment={employmentDetail}
            labels={employmentDetailsCardLabels}
            otherDetails={employment}
          />
          <SpecializedEmploymentDetailsCard
            employment={employment}
            details={employmentDetail}
            labels={specializedEmploymentDetailsCardLabels}
          />
        </Fragment>
      ))}
    </Stack>
  );
};
