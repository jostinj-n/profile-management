import { FC } from "react";
import { Button, ButtonProps } from "@mui/material";

export const GardaButtonTertiary: FC<ButtonProps> = ({ onClick, children }) => (
  <Button variant="text" onClick={onClick}>
    {children}
  </Button>
);
