"use client";

import React from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type Props = {
  label: string;
  value: string | number;
};

export default function GroupingDetailsItem({ label, value }: Readonly<Props>) {
  return (
    <Grid item xs={2} sm={4} md={2}>
      <Box>
        <Typography variant="subtitle2">{label}</Typography>
        <Typography>{value}</Typography>
      </Box>
    </Grid>
  );
}
