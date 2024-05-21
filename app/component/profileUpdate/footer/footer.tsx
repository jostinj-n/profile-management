import React from "react";
import { Button, Stack } from "@mui/material";

export default function Footer() {
  return (
    <Stack
      position={"fixed"}
      bottom={10}
      right={0}
      gap={1}
      pr={2}
      direction="row"
      alignItems={"center"}
      justifyContent={"flex-end"}
    >
      <Button variant="cancel">CANCEL</Button>
      <Button variant="contained">UPDATE</Button>
    </Stack>
  );
}
