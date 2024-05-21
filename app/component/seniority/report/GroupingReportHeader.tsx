"use client";
import { Dictionary } from "@/dictionaries/dictionaries";
import Box from "@mui/material/Box";

import Title from "../../title";
import NavigationBack from "../../NavigateBack";
import { useAppSelector } from "@/app/redux/hooks";
import React from "react";
import GroupingDetails from "../GroupingDetails";

type Props = {
  seniorityTemplate: Dictionary["workforce"]["seniority"]["template"];
};
export default function GroupingReportHeader({
  seniorityTemplate,
}: Readonly<Props>) {
  const groupingSelected = useAppSelector((state) => state.groupingSelected);

  return (
    <>
      <NavigationBack back={seniorityTemplate.back} />
      <Box className="grid md:grid-cols-2 gap-4 grid-cols-1  pb-3">
        <Box className="flex justify-start">
          <Title title={groupingSelected.templateName} />
        </Box>
      </Box>
      <Box paddingY={2}>
        <GroupingDetails
          seniorityTemplate={seniorityTemplate}
          grouping={groupingSelected}
        />
      </Box>
    </>
  );
}
