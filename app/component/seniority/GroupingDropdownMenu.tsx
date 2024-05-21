"use client";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import { Dictionary } from "@/dictionaries/dictionaries";

import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import { GroupingRow } from "@/app/types/templates";
import { GroupingDeleteDialog } from "./delete/GroupingDeleteDialog";

const ITEM_HEIGHT = 48;

type MenuGW = {
  seniority: Dictionary["workforce"]["seniority"];
  groupingRow: GroupingRow;
};

export default function GroupingDropdownMenu({
  groupingRow,
  seniority,
}: Readonly<MenuGW>) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const route = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function goto(url: string): void {
    route.push(url);
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            marginTop: 1.5,
          },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Button
            sx={{ justifyContent: "left" }}
            fullWidth
            variant="text"
            onClick={() => goto(`edit-grouping/${groupingRow.templateId}`)}
            startIcon={<BorderColorIcon color="primary" />}
            color="secondary"
          >
            {seniority.template.list.action.edit}
          </Button>
        </MenuItem>

        <MenuItem>
          <GroupingDeleteDialog
            hiddenMenu={handleClose}
            groupingRow={groupingRow}
            seniority={seniority}
          />
        </MenuItem>
      </Menu>
    </div>
  );
}
