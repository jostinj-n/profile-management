"use client";
import React, { FC } from "react";
import { SnackbarProvider, SnackbarProviderProps } from "notistack";

type Props = Omit<SnackbarProviderProps, "maxSnack">;

export const NotistackProvider: FC<Props> = ({ children, ...rest }) => (
  <SnackbarProvider maxSnack={6} {...rest}>
    {children}
  </SnackbarProvider>
);
