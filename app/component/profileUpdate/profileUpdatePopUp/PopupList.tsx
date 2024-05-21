import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { FC, ReactNode } from "react";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";

type ProfileAction = {
  label: string;
  icon: ReactNode;
  description: string;
  nextStepUrl: (id: string) => string;
};

const profileActions: ProfileAction[] = [
  {
    label: "Update Profile",
    icon: <ManageAccountsOutlinedIcon />,
    description:
      "Person profile, contact details, government IDs, banking information, seniority",
    nextStepUrl: (id: string) => `/workforce/profile-update/${id}`,
  },
  {
    label: "Create Staffing Transaction",
    icon: <BadgeOutlinedIcon />,
    description:
      "Classification change, leave of absence, return to work, resignation, promotion, termination, salary revision, parking change, transfer, demotion, other",
    nextStepUrl: (id: string) => `/employee/${id}/staffing-transaction`, // Include id in the URL
  },
];

type Props = {
  nextStepUrl: (value: string) => void;
  profileID: string;
};
export const PopupList: FC<Props> = ({ nextStepUrl, profileID }) => {
  return (
    <List>
      {profileActions.map((action, index) => (
        <ListItem key={index} sx={{ paddingBottom: 0, paddingTop: 0 }}>
          <ListItemButton
            onClick={() => nextStepUrl(action.nextStepUrl(profileID))}
            sx={{
              border: "1px solid transparent",
              "&:hover , &:focus": {
                backgroundColor: "lightRed.main",
                border: "1px solid",
                borderColor: "primary.main",
                color: "initial",
                ".MuiListItemIcon-root": { color: "primary.main" },
              },
            }}
          >
            <ListItemIcon>{action.icon}</ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ fontWeight: 500 }}
              primary={action.label}
              secondary={action.description}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
