import { GroupingApiRequest } from "../types/templates";

export type Table =
  | "company"
  | "division"
  | "worklocation"
  | "seniority_date_type";

const parseFieldValue = (value: string) =>
  value !== "-1" ? parseInt(value) : undefined;

export const getField = (table: Table, value: string) => {
  switch (table) {
    case "company":
      return {
        company_id: parseFieldValue(value),
      };
    case "division":
      return {
        company_division_id: parseFieldValue(value),
      };
    case "worklocation":
      return {
        work_location_id: parseFieldValue(value),
      };
    case "seniority_date_type":
      return {
        report_date_type_id: parseFieldValue(value),
      };
  }
};

export const getFieldKey = (table: string) => {
  const record = {
    company: "company_id",
    division: "company_division_id",
    worklocation: "work_location_id",
    seniority_date_type: "report_date_type_id",
  };
  return record[table as keyof typeof record] as keyof GroupingApiRequest;
};
