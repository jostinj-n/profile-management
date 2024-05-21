"use client";
import React from "react";
import { Dictionary } from "@/dictionaries/dictionaries";

import Stack from "@mui/material/Stack";
import GlobalSearch from "../../table/table-global-search";

type Props = {
  seniority: Dictionary["workforce"]["seniority"];
};
export default function GroupingReportFilter({ seniority }: Readonly<Props>) {
  return (
    <Stack direction="row">
      <GlobalSearch seniority={seniority} />
    </Stack>
  );
}
