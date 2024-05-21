import { FC, useEffect } from "react";

import { Dictionary } from "@/dictionaries/dictionaries";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { fetchSeniorityById } from "../../../../redux/features/employeeSenioritySlice";
import { RootState } from "../../../../redux/store";
import { SeniorityDetailCard } from "./SeniorityDetailCard";

type Props = {
  employeeId: string;
  seniorityLabels: Dictionary["employee"]["seniority"];
  lastUpdateLabels: Dictionary["employee"]["lastUpdate"];
};

export const Seniority: FC<Props> = ({ employeeId, seniorityLabels }) => {
  const dispatch = useAppDispatch();
  const { seniority, isLoading, error } = useAppSelector(
    (state: RootState) => state.employeeSeniority,
  );

  useEffect(() => {
    dispatch(fetchSeniorityById(employeeId));
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
    <div>
      <div className="grid grid-cols-1">
        <div>
          <SeniorityDetailCard details={seniority} labels={seniorityLabels} />
        </div>
      </div>
    </div>
  );
};
