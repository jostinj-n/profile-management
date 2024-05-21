import { Dictionary } from "@/dictionaries/dictionaries";
import { HeadCell } from "../../table/table-header";

type ColumnLabel = Dictionary["workforce"]["seniority"]["person"];

export function getHeadCells(columnLabel: ColumnLabel): HeadCell[] {
  return [
    {
      id: "name",
      label: columnLabel.employee_number,
      position: 0,
      isSort: false,
    },
    {
      id: "lms",
      label: columnLabel.LMS,
      position: 0,
      isSort: false,
    },
    {
      id: "full_name",
      label: columnLabel.fullName,
      position: 1,
      isSort: true,
    },
    {
      id: "seniority_rank",
      label: columnLabel.seniorityRank,
      position: 2,
      isSort: true,
    },
    {
      id: "status_classification",
      label: columnLabel.statusClassification,
      position: 3,
      isSort: true,
    },
    {
      id: "wls_date",
      label: columnLabel.workLocationDate,
      position: 4,
      isSort: true,
    },
  ];
}
