"use client";

import React from "react";

import Box from "@mui/material/Box";

import { Dictionary } from "@/dictionaries/dictionaries";

import GroupingFilter from "./GroupingFilter";
import GroupingHeader from "./GroupingHeader";
import GroupingTable from "./GroupingTable";

type Props = {
  seniority: Dictionary["workforce"]["seniority"];
};

export default function Groupings({ seniority }: Readonly<Props>) {
  return (
    <Box>
      <GroupingHeader seniorityTemplate={seniority.template} />
      <GroupingFilter seniority={seniority} />
      <GroupingTable seniority={seniority} />
    </Box>
  );
}
