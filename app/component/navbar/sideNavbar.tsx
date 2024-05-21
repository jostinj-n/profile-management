import React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddIcon from "@mui/icons-material/Add";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { SideBarSubList } from "@/app/component/navbar/sideBarSubList";
import { MainLink } from "@/app/component/navbar/type";
import { Dictionary, getDictionary } from "@/dictionaries/dictionaries";
import { Locale } from "@/i18n.config";

const fontSize = "medium";

const getLinks = (dict: Dictionary): MainLink[] => [
  {
    label: dict.sidebar.home,
    icon: <HomeOutlinedIcon fontSize={fontSize} />,
    link: "/",
    dataTestId: "navbar-home",
  },
  {
    label: dict.sidebar.management,
    dataTestId: "navbar-workforce",
    icon: <PeopleAltOutlinedIcon fontSize={fontSize} />,
    subLink: [
      {
        label: dict.sidebar.profile,
        icon: <AddIcon />,
        link: "/employee",
      },
      {
        label: dict.sidebar.newProfile,
        icon: <AddIcon />,
        link: "/workforce/create-profile",
        dataTestId: "navbar-workforce-create-profile",
      },
    ],
  },
];

export default async function SideNavbar({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);
  const links = getLinks(dict);
  return (
    <List>
      {links.map((firstLevel) =>
        firstLevel.subLink ? (
          <SideBarSubList
            key={firstLevel.label}
            label={firstLevel.label}
            icon={firstLevel.icon}
            subLink={firstLevel.subLink}
            dataTestId={firstLevel.dataTestId}
          />
        ) : (
          <ListItemButton
            key={firstLevel.label}
            href={firstLevel.link ?? ""}
            data-testid={firstLevel.dataTestId}
          >
            {firstLevel.icon && <ListItemIcon>{firstLevel.icon}</ListItemIcon>}
            <ListItemText>{firstLevel.label}</ListItemText>
          </ListItemButton>
        ),
      )}
    </List>
  );
}
