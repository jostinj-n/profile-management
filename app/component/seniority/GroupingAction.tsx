"use client";

import React from "react";

import { Dictionary } from "@/dictionaries/dictionaries";

import { GroupingRow } from "@/app/types/templates";
import GroupingDropdownMenu from "./GroupingDropdownMenu";

type Props = {
  seniority: Dictionary["workforce"]["seniority"];
  groupingRow: GroupingRow;
};

export default function GroupingAction({
  seniority,
  groupingRow,
}: Readonly<Props>) {
  return (
    <GroupingDropdownMenu seniority={seniority} groupingRow={groupingRow} />
  );
}
