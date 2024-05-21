import React, { ReactNode } from "react";
import Header from "@/app/component/profileUpdate/header/header";
import SideNavbar from "@/app/component/profileUpdate/navbar/sideNavbar";
import { Box } from "@mui/material";

export default async function UpdateProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
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
        <Header />
      </Box>
      <Box
        sx={{
          backgroundColor: "#FBFBFA",
          gridArea: "sidebar",
          borderRight: border,
        }}
      >
        <SideNavbar />
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
