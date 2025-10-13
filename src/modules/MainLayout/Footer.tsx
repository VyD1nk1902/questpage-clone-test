import { cn } from "classnames-merge-tw";
import React from "react";
import { LuckyTechMiniLogo } from "@/constants/image.constant";

import { Button } from "@/components/ui/button";
import {
  DiscordLogoIcon,
  UsersThreeIcon,
  XLogoIcon,
} from "@phosphor-icons/react";
import { LineVertical } from "@/constants/image.constant";
import useDeviceType from "@/hooks/useMediaQuery";
import { NavLink } from "react-router-dom";
import { CompassIcon, TrophyIcon, UserCircle } from "lucide-react";

const dataFooterMobile = [
  {
    link: "/",
    icon: CompassIcon,
    title: "Discover",
  },
  {
    link: "/leaderboard",
    icon: TrophyIcon,
    title: "Leaderboard",
  },
  {
    link: "/community",
    icon: UsersThreeIcon,
    title: "Communities",
  },
  {
    link: "/profile",
    icon: UserCircle,
    title: "Profile",
  },
];

const Footer = () => {
  const deviceType = useDeviceType();
  return (
    <>
      {deviceType == "desktop" ? (
        <footer className="px-4 h-11 flex justify-between items-center border-t border-border">
          <div className="flex gap-3 items-center">
            <img
              src={LuckyTechMiniLogo}
              className=" w-7 object-contain h-7"
              alt="LuckyTech_logo"
            />
            <span className="text-xs font-medium">
              ©LuckyTech. 2025 ALL RIGHTS RESERVED
            </span>
          </div>
          <div className="flex gap-3 items-center">
            <span className="text-xs font-medium">Join our community</span>
            <img src={LineVertical} className="w-1 h-7 mx-1" alt="separator" />
            <Button
              variant={"icon"}
              size={"default"}
              className="!rounded-[6px] w-7 border border-border bg-input hover:bg-white/20"
            >
              <DiscordLogoIcon weight="fill" size={16} />
            </Button>
            <Button
              variant={"icon"}
              size={"default"}
              className="!rounded-[6px] w-7 border border-border bg-input hover:bg-white/20"
            >
              <XLogoIcon size={16} />
            </Button>
          </div>
        </footer>
      ) : (
        <footer
          className="p-3 w-screen z-[10000] fixed bottom-0 h-15 grid grid-cols-4
         border-t border-border bg-background"
        >
          {dataFooterMobile.map((item, index) => (
            <NavLink
              to={item.link}
              key={index}
              className={({ isActive }) =>
                cn(
                  "px-2 flex flex-col justify-center items-center gap-0.5",
                  isActive ? "text-blue-500" : "text-foreground"
                )
              }
            >
              <item.icon size={20} />
              <span className="text-xs">{item.title}</span>
            </NavLink>
          ))}
        </footer>
      )}
    </>
  );
};

export default Footer;
