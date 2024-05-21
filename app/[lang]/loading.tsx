import React from "react";
import { Grid } from "@mui/material";
import Image from "next/image";

export default function CompLoading() {
  return (
    <Grid
      container
      height="80vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Image
        src="/garda-lion-logo.svg"
        alt="Logo"
        className="animate-spin"
        width={96}
        height={96}
      />
      <div className=" text-2xl text-red-700">Please wait...</div>
    </Grid>
  );
}
