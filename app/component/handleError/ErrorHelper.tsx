// Importez les types requis correctement
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import React from "react";
import Alert from "@mui/material/Alert";

type Props = {
  error: FetchBaseQueryError | SerializedError;
};

export default function ErrorHelper({ error }: Readonly<Props>) {
  const handleError = (err: FetchBaseQueryError | SerializedError) => {
    if ("status" in err && "data" in err) {
      // FetchBaseQueryError
      return { status: err.status, message: err.data };
    } else if ("status" in err && "message" in err) {
      // SerializedError
      return { status: err.status, message: err.message };
    } else {
      return { status: "INTERNAL_ERROR", message: "INTERNAL ERROR" };
    }
  };

  const errorVal = handleError(error);

  return <Alert severity="error">{errorVal.message as string}</Alert>;
}
