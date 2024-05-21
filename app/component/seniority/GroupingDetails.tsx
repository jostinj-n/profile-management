"use client";

import React from "react";

import { Dictionary } from "@/dictionaries/dictionaries";
import { GroupingRow } from "@/app/types/templates";
import Grid from "@mui/material/Grid";
import GroupingDetailsItem from "./GroupingDetailsItem";
import { gardaTheme } from "@/app/muiTheme/theme";
import Box from "@mui/material/Box";

type Props = {
  seniorityTemplate: Dictionary["workforce"]["seniority"]["template"];
  grouping: GroupingRow;
};

export default function GroupingDetails({
  seniorityTemplate,
  grouping,
}: Readonly<Props>) {
  return (
    <Box
      padding={2}
      sx={{
        backgroundColor: gardaTheme.palette.coolGrey.light,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: gardaTheme.palette.officialGrey.light,
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <GroupingDetailsItem
          label={seniorityTemplate.list.column.company}
          value={grouping.companyName}
        />
        <GroupingDetailsItem
          label={seniorityTemplate.list.column.division}
          value={grouping.divisionName}
        />
        <GroupingDetailsItem
          label={seniorityTemplate.list.column.workLocation}
          value={grouping.workLocations?.map((item) => item.name).join(",")}
        />
        <GroupingDetailsItem
          label={seniorityTemplate.list.column.Department}
          value={grouping.departments?.map((item) => item.name).join(",")}
        />
        <GroupingDetailsItem
          label={seniorityTemplate.list.column.organizationalRole}
          value={grouping.organisationroles?.map((item) => item.name).join(",")}
        />
        <GroupingDetailsItem
          label={seniorityTemplate.list.column.organizationalRoleSubtype}
          value={grouping.organisationrolesubtypes
            ?.map((item) => item.name)
            .join(",")}
        />
        <GroupingDetailsItem
          label={seniorityTemplate.list.column.statusClassification}
          value={grouping.employmentclassifications
            ?.map((item) => item.name)
            .join(",")}
        />
        <GroupingDetailsItem
          label={seniorityTemplate.list.column.employmentStatus}
          value={grouping.employmentstatus?.map((item) => item.name).join(",")}
        />
        <GroupingDetailsItem
          label={seniorityTemplate.list.column.reportDataType}
          value={grouping.reportTypeName}
        />
        <GroupingDetailsItem
          label={seniorityTemplate.list.column.unionizedOnly}
          value={grouping.unionizedEmployeeOnly ? "Yes" : "No"}
        />
        <GroupingDetailsItem
          label={seniorityTemplate.list.column.includeContactDeatils}
          value={grouping.includeContactDetails ? "Yes" : "No"}
        />
      </Grid>
    </Box>
  );
}
