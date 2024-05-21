import { FC, useEffect } from "react";
import { Stack } from "@mui/material";
import { EmployeeBankingInformation } from "@/app/types/employee";
import { EmployeeBankingInformationCard } from "@/app/[lang]/employee/[id]/personal/EmployeeBankingInformationCard";
import { PersonalDetailsCard } from "@/app/[lang]/employee/[id]/personal/PersonalDetailsCard";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { Dictionary } from "@/dictionaries/dictionaries";
import { fetchPersonalDetailsById } from "../../../../redux/features/personalDetailSlice";
import { RootState } from "../../../../redux/store";
import { DocumentCard } from "@/app/[lang]/employee/[id]/personal/DocumentsCard";

type Props = {
  employeeId: string;
  personalDetailLabels: Dictionary["employee"]["personalDetails"];
  documentDetailCardLabels: Dictionary["employee"]["documentDetailCard"];
  bankDetailLabels: Dictionary["employee"]["bankDetails"];
};

export const PersonalDetails: FC<Props> = ({
  employeeId,
  personalDetailLabels,
  documentDetailCardLabels,
  bankDetailLabels,
}) => {
  const dispatch = useAppDispatch();
  const { personalDetails, isLoading, error } = useAppSelector(
    (state: RootState) => state.personalDetail,
  );

  useEffect(() => {
    dispatch(fetchPersonalDetailsById(employeeId));
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
      <PersonalDetailsCard
        details={personalDetails.personal}
        labels={personalDetailLabels}
      />
      {personalDetails.documents.map((doc) => (
        <DocumentCard
          key={`${doc.idNumber}_${doc.idType}_${doc.issuingAgency}`}
          details={doc}
          labels={documentDetailCardLabels}
        />
      ))}
      {personalDetails?.banking.map((bank: EmployeeBankingInformation) => (
        <EmployeeBankingInformationCard
          key={`${bank.paymentTypeCode}_${bank.accountNumber}`}
          labels={bankDetailLabels}
          banking={bank}
        />
      ))}
    </Stack>
  );
};
