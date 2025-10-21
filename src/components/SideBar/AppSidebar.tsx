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
  SquareTerminal,
  TrophyIcon,
  UserCircleIcon,
  XIcon,
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
import { useNavigate } from "react-router-dom";
import useDeviceType from "@/hooks/useMediaQuery";
import { Button } from "../ui/button";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  setOpen?: (value: boolean) => void; // ✅ thêm prop để đóng Sheet
  setOpenDialog?: (value: boolean) => void;
}

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
      url: "/",
      icon: CompassIcon,
    },
    {
      title: "Leaderboard",
      url: "/leaderboard",
      icon: TrophyIcon,
    },
    {
      title: "Communities",
      url: "/community",
      icon: UsersThreeIcon,
    },
    {
      title: "Profile",
      url: "/profile",
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

export function AppSidebar({
  collapsible = "icon",
  setOpen,
  setOpenDialog, // ✅ nhận từ Index
  ...props
}: AppSidebarProps) {
  const deviceType = useDeviceType();
  const navigate = useNavigate();
  return (
    <Sidebar
      collapsible={collapsible}
      {...props}
      className="border border-r border-border bg-sidebar"
    >
      {deviceType == "desktop" ? (
        <SidebarHeader
          className="flex flex-col justify-center items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
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
        </SidebarHeader>
      ) : (
        <SidebarHeader
          className="flex flex-row justify-between items-center p-4"
          onClick={() => navigate("/")}
        >
          <img
            src={LuckyTechLogo}
            className="w-[60%] object-contain h-full"
            alt="LuckyTech_logo"
          />
          <Button variant="ghost" size="icon" onClick={() => setOpen?.(false)}>
            <XIcon />
          </Button>
        </SidebarHeader>
      )}

      <SidebarContent>
        <NavMain items={data.navMain} />
        <Separator className="w-[90%] mx-auto" />
        <NavProjects projects={data.projects} setOpenDialog={setOpenDialog} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
