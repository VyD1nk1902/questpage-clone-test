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
    path: "/auth/twitter/callback",
    Component: lazy(() => import("@/pages/CallBackPage/TwitterCallBackPage")),
  },

  {
    path: "/auth/discord/callback",
    Component: lazy(() => import("@/pages/CallBackPage/DiscordCallBackPage")),
  },
];

export default routes;
