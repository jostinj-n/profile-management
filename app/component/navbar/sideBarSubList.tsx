"use client";

import React, { FC, ReactNode, useState } from "react";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { MainLink } from "@/app/component/navbar/type";

export const SideBarSubList: FC<{
  subLink: MainLink[];
  label: string;
  icon: ReactNode;
  dataTestId?: string;
}> = ({ subLink, label, icon, dataTestId }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ListItemButton
        key={label}
        onClick={() => setOpen(!open)}
        data-testid={dataTestId}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>{label}</ListItemText>
        {open ? (
          <ExpandLess color={"action"} />
        ) : (
          <ExpandMore color={"action"} />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
          {subLink.map((sub) => (
            <ListItemButton
              key={sub.label}
              href={sub.link ?? ""}
              sx={{ pl: 9 }}
              data-testid={sub.dataTestId}
            >
              <ListItemText>{sub.label}</ListItemText>
              {sub.icon && (
                <ListItemIcon sx={{ pl: 5 }}>{sub.icon}</ListItemIcon>
              )}
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
};
