import { MouseEventHandler, PropsWithChildren } from "react";

export type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
} & PropsWithChildren;
