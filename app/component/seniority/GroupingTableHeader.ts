import { Dictionary } from "@/dictionaries/dictionaries";
import { HeadCell } from "../table/table-header";

type ColumnLabel =
  Dictionary["workforce"]["seniority"]["template"]["list"]["column"];

export function getHeadCells(columnLabel: ColumnLabel): HeadCell[] {
  return [
    {
      id: "name",
      label: columnLabel.name,
      position: 1,
      isSort: true,
    },
    {
      id: "company",
      label: columnLabel.company,
      position: 2,
      isSort: true,
    },
    {
      id: "division",
      label: columnLabel.division,
      position: 3,
      isSort: true,
    },
    {
      id: "department",
      label: columnLabel.Department,
      position: 4,
      isSort: true,
    },
    {
      id: "work_location",
      label: columnLabel.workLocation,
      position: 5,
      isSort: true,
    },
    {
      id: "employment_classification",
      label: columnLabel.reportDataType,
      position: 6,
      isSort: false,
    },
    {
      id: "action",
      label: columnLabel.action,
      position: 7,
      isSort: false,
    },
    {
      id: "",
      label: "",
      position: 8,
      isSort: false,
    },
  ];
}
