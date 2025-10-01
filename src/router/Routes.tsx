import type { ComponentType, JSX } from "react";
import { lazy } from "react";

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  {
    path: "/",
    Component: lazy(() => import("@/pages/HomePage")),
  },
  {
    path: "/mission",
    Component: lazy(() => import("@/pages/Mission")),
  },
];

export default routes;
