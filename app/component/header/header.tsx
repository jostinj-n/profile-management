import React from "react";
import Avatar from "@mui/material/Avatar";
import Image from "next/image";
import { Stack } from "@mui/material";

export default async function Header() {
  return (
    <Stack direction="row" justifyContent="space-between" px={3} py={1}>
      <Image src="/garda-lion-logo.svg" alt="Logo" width={46} height={46} />

      <Stack direction="row" alignItems="center" gap={1}>
        <Avatar
          alt="Remy Sharp"
          // src="https://graph.microsoft.com/v1.0/me/photo/$value"
          className=" w-6 h-6"
        />
      </Stack>
    </Stack>
  );
}
