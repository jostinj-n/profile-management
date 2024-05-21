"use client"; // Error components must be Client Components

import { useEffect } from "react";
import ErrorOutlineOutlined from "@mui/icons-material/ErrorOutlineOutlined";
import { Button, Grid } from "@mui/material";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    //TODO Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Grid
      container
      height="80vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Image src="/garda-lion-logo.svg" alt="Logo" width={96} height={96} />
      <h2 className=" p-4 text-gwColor-primary01 flex justify-center items-center">
        Something went wrong
        <ErrorOutlineOutlined className="text-gwColor-primary01 w-10 h-10 pb-2" />
      </h2>

      <Button variant="outlined" color="error" onClick={reset}>
        Go back
      </Button>
    </Grid>
  );
}
