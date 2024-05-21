import { FC } from "react";
import { Button, ButtonProps } from "@mui/material";

export const GardaButtonPrimary: FC<ButtonProps> = ({ onClick, children }) => (
  <Button variant="contained" onClick={onClick}>
    {children}
  </Button>
);
