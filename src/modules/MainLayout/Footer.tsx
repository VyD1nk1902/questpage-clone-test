import { cn } from "classnames-merge-tw";
import React from "react";
import { LuckyTechMiniLogo } from "@/constants/image.constant";

import { Button } from "@/components/ui/button";
import { DiscordLogoIcon, XLogoIcon } from "@phosphor-icons/react";
import { LineVertical } from "@/constants/image.constant";

const Footer = () => {
  return (
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
  );
};

export default Footer;
