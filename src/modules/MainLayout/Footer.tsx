import { cn } from "classnames-merge-tw";
import React from "react";
import LuckyTech_mini from "/public/Sidebar/LuckyTech_mini_logo.svg";

import { Button } from "@/components/ui/button";
import { DiscordLogoIcon, XLogoIcon } from "@phosphor-icons/react";

const Footer = () => {
  return (
    <footer className="px-4 h-11 flex justify-between items-center border-t border-border">
      <div className="flex gap-3 items-center">
        <img
          src={LuckyTech_mini}
          className=" w-7 object-contain h-7"
          alt="LuckyTech_logo"
        />
        <span className="text-xs font-medium">
          ©LuckyTech. 2025 ALL RIGHTS RESERVED
        </span>
      </div>
      <div className="flex gap-3 items-center">
        <span className="text-xs font-medium">Join our community</span>
        <img
          src="/public/Line (Stroke).svg"
          className="w-1 h-7 mx-1"
          alt="separator"
        />
        <Button
          variant={"icon"}
          size={"default"}
          className="!rounded-[6px] w-7 border border-border bg-input"
        >
          <DiscordLogoIcon weight="fill" size={16} />
        </Button>
        <Button
          variant={"icon"}
          size={"default"}
          className="!rounded-[6px] w-7 border border-border bg-input"
        >
          <XLogoIcon size={16} />
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
