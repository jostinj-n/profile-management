import { Box } from "@mui/material";
import dayjs from "dayjs";
import DataSummary, { DataSummaryType } from "./DataSummary";
import { useEffect, useState } from "react";

export default function ApprovalUser() {
  const [data, setData] = useState<DataSummaryType[]>([]);
  const getSummaryData = (): DataSummaryType[] => {
    return [
      {
        label: "Approved By",
        value: "xxxx xxxx",
      },
      {
        label: "Email",
        value: "xxxxxx@garda.com",
      },
      {
        label: "Job Title",
        value: "IT ",
      },
      {
        label: "Date Approved",
        value: dayjs().format("DD/MM/YYYY"),
      },
    ] as DataSummaryType[];
  };
  useEffect(() => {
    setData(getSummaryData());
  }, []);
  return (
    <Box paddingY={5}>
      <DataSummary data={data} title="Approvals" />
    </Box>
  );
}
