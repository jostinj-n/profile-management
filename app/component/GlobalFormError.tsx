import * as React from "react";
import Alert from "@mui/material/Alert";
import { FieldErrors, FieldValues } from "react-hook-form";
import Stack from "@mui/material/Stack";

type Form<T extends FieldValues> = {
  errors: FieldErrors<T>;
};

export const GlobalFormError = <T extends FieldValues>({ errors }: Form<T>) => {
  return (
    Object.keys(errors).length > 0 && (
      <Stack paddingY={3}>
        <Alert severity="error">
          {Object.entries(errors).map(([fieldName, errorMessage]) => (
            <div key={fieldName}>
              {errorMessage && (
                <span style={{ color: "red" }}>
                  {JSON.stringify(errorMessage.message)}
                </span>
              )}
            </div>
          ))}
        </Alert>
      </Stack>
    )
  );
};
