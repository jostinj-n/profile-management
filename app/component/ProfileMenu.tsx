import { FC } from "react";
import { Box, Tab, TabProps, Tabs } from "@mui/material";
import { LinkProps } from "next/link";
import { Dictionary } from "@/dictionaries/dictionaries";

type Props = {
  employeeId: string;
  selectedTab: number;
  labels: Dictionary["employee"]["menu"];
};

const LinkTab: React.ComponentType<TabProps & LinkProps> =
  Tab as React.ComponentType<TabProps & LinkProps>;

export const ProfileMenu: FC<Props> = ({ labels, selectedTab, employeeId }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Tabs value={selectedTab} aria-label="Employee profile menu">
          <LinkTab
            label={labels.personProfile}
            href={`/employee/${employeeId}/`}
          />
          <LinkTab
            label={labels.employment}
            href={`/employee/${employeeId}/employment`}
          />
          <LinkTab
            label={labels.contact}
            href={`/employee/${employeeId}/contacts`}
          />
          <LinkTab
            label={labels.personalDetails}
            href={`/employee/${employeeId}/personal`}
          />
          <LinkTab
            label={labels.seniority}
            href={`/employee/${employeeId}/seniority`}
          />
          <LinkTab
            label={labels.compensation}
            href={`/employee/${employeeId}/compensation`}
          />
          <LinkTab
            label={labels.profileManagement}
            href={`/employee/${employeeId}/management`}
          />
        </Tabs>
      </Box>
    </Box>
  );
};
