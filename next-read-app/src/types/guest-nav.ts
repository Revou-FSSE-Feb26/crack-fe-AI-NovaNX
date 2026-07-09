import type { Route } from "next";

export type GuestNavAction = {
  label: string;
  href: Route;
};

export type GuestNavProps = {
  className?: string;
  loginAction?: GuestNavAction;
  registerAction?: GuestNavAction;
};
