import { ReferenceDataAPIResponse } from "@/app/types/referenceData";

export const mockEmploymentClassification: ReferenceDataAPIResponse = [
  {
    id: 1,
    name: "Full Time",
    code: "FT",
    table_name: "ref_employment_classification",
  },
  {
    id: 2,
    name: "Part time",
    code: "PT",
    table_name: "ref_employment_classification",
  },
];
