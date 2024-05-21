import { FC } from "react";
import { Stack, StackProps } from "@mui/material";

type LineProps = Omit<StackProps, "direction">;

export const Line: FC<LineProps> = ({ children, ...rest }) => (
  <Stack direction={"row"} {...rest}>
    {children}
  </Stack>
);
