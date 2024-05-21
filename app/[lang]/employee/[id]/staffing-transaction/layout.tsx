import React, { ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";
import StaffingTransactionStepper from "./component/StaffingTransactionStepper";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/dictionaries/dictionaries";

export default async function UpdateProfileLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: { lang: Locale };
}>) {
  const { lang } = params;
  const {
    workforce: { staffingTransaction },
  } = await getDictionary(lang);

  const border = "1.5px solid #0000001F";
  return (
    <Box
      m={"-1rem"}
      sx={{
        display: "grid",
        gridTemplateRows: "60px 1fr 60px",
        gridTemplateColumns: "260px 1fr",
        gridTemplateAreas: `
          "header header"
          "sidebar main"
          "footer footer"
        `,
      }}
    >
      <Box
        sx={{
          gridArea: "header",
          borderBottom: border,
        }}
      >
        <Stack justifyContent={"center"} p={3} sx={{ height: "100%" }}>
          <Typography variant={"h6"}>{staffingTransaction.title}</Typography>
        </Stack>
      </Box>
      <Box
        sx={{
          backgroundColor: "#FBFBFA",
          gridArea: "sidebar",
          borderRight: border,
        }}
      >
        <StaffingTransactionStepper staffingTransaction={staffingTransaction} />
      </Box>
      <Box
        sx={{
          overflow: "auto",
          gridArea: "main",
          padding: "2rem",
          height: "calc(100vh - 180px)",
        }}
      >
        {children}
      </Box>
      <Box
        sx={{
          gridArea: "footer",
          borderTop: border,
        }}
      ></Box>
    </Box>
  );
}
