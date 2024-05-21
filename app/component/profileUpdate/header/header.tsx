import React from "react";
import { Stack, Typography } from "@mui/material";

export default function Header() {
  return (
    <Stack justifyContent={"center"} p={3} sx={{ height: "100%" }}>
      <Typography variant={"h6"}>Update User Profile</Typography>
    </Stack>
  );
}
