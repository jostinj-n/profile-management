import { ReactNode } from "react";

export type MainLink = {
  label: string;
  icon?: ReactNode;
  link?: string;
  dataTestId?: string;
  subLink?: MainLink[];
};
