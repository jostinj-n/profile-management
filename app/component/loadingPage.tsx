import React from "react";
import Link from "next/link";
import { Button, Grid } from "@mui/material";

const LoadingPage = async () => {
  return (
    <Grid
      container
      height="80vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Link href="/">
        <Button variant="outlined" color="error">
          Back
        </Button>
      </Link>
    </Grid>
  );
};

export default LoadingPage;
