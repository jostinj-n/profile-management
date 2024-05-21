import { Chip } from "@mui/material";

type ComponentProps = {
  status: string; // EmployeeStatus
};

export default function EmployeeStatusChip({ status }: ComponentProps) {
  return (
    <span>
      {status === "permanent" ? (
        <Chip color="success" label="Permanent" />
      ) : (
        <Chip color="default" label="Part-time" />
      )}
    </span>
  );
}
