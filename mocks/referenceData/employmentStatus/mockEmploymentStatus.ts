import { ReferenceDataAPIResponse } from "@/app/types/referenceData";

export const mockEmploymentStatus: ReferenceDataAPIResponse = [
  {
    id: 1,
    name: "Active",
    code: "Active",
    table_name: "ref_employment_status",
  },
  {
    id: 2,
    name: "Inactive",
    code: "Inactive",
    table_name: "ref_employment_status",
  },
  {
    id: 3,
    name: "Terminated",
    code: "Inactive",
    table_name: "ref_employment_status",
  },
  {
    id: 4,
    name: "Recruit",
    code: "Inactive",
    table_name: "ref_employment_status",
  },
  {
    id: 5,
    name: "Rescinded",
    code: "Inactive",
    table_name: "ref_employment_status",
  },
  {
    id: 6,
    name: "Suspended Pending Investigation Active",
    code: "SPI-Active",
    table_name: "ref_employment_status",
  },
  {
    id: 7,
    name: "Suspended Pending Investigation Inactive",
    code: "SPI-Inactive",
    table_name: "ref_employment_status",
  },
];
