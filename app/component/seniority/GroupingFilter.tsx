"use client";
import React from "react";
import { Dictionary } from "@/dictionaries/dictionaries";
import GlobalSearch from "../table/table-global-search";
import Stack from "@mui/material/Stack";
import FilterComponent from "./FilterComponent";
import { Table } from "@/app/util/referenceTable";

type Props = {
  seniority: Dictionary["workforce"]["seniority"];
};
export default function GroupingFilter({ seniority }: Readonly<Props>) {
  const referenceTables: Table[] = [
    "company",
    "division",
    "worklocation",
    "seniority_date_type",
  ];
  return (
    <Stack direction={{ xs: "column", sm: "column", md: "row" }} gap={2}>
      <GlobalSearch seniority={seniority} />
      <Stack
        direction={{ xs: "column", sm: "row", md: "row" }}
        spacing={{ xs: 1, md: 1 }}
        justifyContent="flex-start"
      >
        {referenceTables.map((referenceTable) => (
          <FilterComponent
            key={referenceTable}
            seniorityFilter={seniority.filter}
            referenceTable={referenceTable}
          />
        ))}
      </Stack>
    </Stack>
  );
}
