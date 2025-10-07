import { LuckyTechLogo, LuckyTechMiniLogo } from "@/constants/image.constant";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  CompassIcon,
  Frame,
  GalleryVerticalEnd,
  Headset,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  TrophyIcon,
  UserCircleIcon,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-project";
import { NavUser } from "./nav-users";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { GearIcon, UsersThreeIcon } from "@phosphor-icons/react";
import { Separator } from "../ui/separator";

// This is sample data.
const data = {
  user: {
    name: "CryptoHawk",
    code: "0x76x..ea92",
    avatar: "https://github.com/shadcn.png",
  },
  navMain: [
    {
      title: "Discovery & Earn",
      url: "#",
      icon: CompassIcon,
    },
    {
      title: "Leaderboard",
      url: "/leaderboard",
      icon: TrophyIcon,
    },
    {
      title: "Communities",
      url: "#",
      icon: UsersThreeIcon,
    },
    {
      title: "Profile",
      url: "#",
      icon: UserCircleIcon,
    },
  ],
  projects: [
    {
      name: "Setting",
      url: "#",
      icon: GearIcon,
    },
    {
      name: "Support",
      url: "#",
      icon: Headset,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      {...props}
      // style={{ "--sidebar-width": "260px" } as React.CSSProperties}
      className="border border-r border-border bg-sidebar"
    >
      <SidebarHeader className="flex flex-col justify-center items-center">
        <a href="/">
          <img
            src={LuckyTechLogo}
            className="w-full object-contain h-full group-data-[collapsible=icon]:hidden py-3 px-6"
            alt="LuckyTech_logo"
          />
          <img
            src={LuckyTechMiniLogo}
            className="hidden w-7 object-contain h-7 group-data-[collapsible=icon]:block"
            alt="LuckyTech_logo"
          />
        </a>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <Separator />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
