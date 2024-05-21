import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { FC } from "react";
import { UseFieldArrayRemove } from "react-hook-form";

type Props = {
  remove: UseFieldArrayRemove;
  index: number;
};
export const DeleteButton: FC<Props> = ({ remove, index }) => {
  return (
    <IconButton color={"primary"} onClick={() => remove(index)} size="large">
      <DeleteIcon />
    </IconButton>
  );
};
