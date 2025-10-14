import useDeviceType from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  CaretDown,
  MegaphoneSimple,
  Moon,
  Plus,
  Sun,
  Globe,
} from "@phosphor-icons/react";
import { menuData } from "@/constants/app-data.constant";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebar } from "@/components/ui/sidebar";
import ConnectWalletButton from "@/components/button/ConnectWalletButton";
import { LineVertical, DiamondLogo } from "@/constants/image.constant";
import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/stores/user.store";
import useApi from "@/hooks/useApi";
import { userApi } from "@/apis/user.api";
import SearchCommand from "@/components/SearchCommand";
import { useAppData } from "@/hooks/useAppData";

const EXPANDED_WIDTH = "16rem"; // Tương đương SIDEBAR_WIDTH
const COLLAPSED_WIDTH = "3rem"; // Tương đương SIDEBAR_WIDTH_ICON

const Header = () => {
  const deviceType = useDeviceType();
  const navigate = useNavigate();

  const location = useLocation();
  const param = useParams();

  const { state, isMobile } = useSidebar();

  const [open, setOpen] = useState(false);

  const currentWidth = isMobile
    ? "0px"
    : state === "collapsed"
    ? COLLAPSED_WIDTH
    : EXPANDED_WIDTH;

  const { userInfo } = useAppData();

  return (
    <div
      className={cn(
        "py-3 px-3 flex justify-between fixed top-0 z-50 bg-accent shrink-0 items-center gap-2 border h-[65px]",
        "md:flex hidden"
      )}
      style={{
        left: currentWidth,
        width: `calc(100% - ${currentWidth})`,
        //transition để resize mượt mà
        transition: "width 0.2s ease-in-out, left 0.2s ease-in-out",
      }}
    >
      <div className="flex gap-6 justify-center items-center">
        <SidebarTrigger />
        <div
          role="button"
          tabIndex={0}
          onClick={() => setOpen(true)}
          // onKeyDown = {}
          className="w-full h-9 px-4 bg-white/10 !rounded-[6px] border border-white/10 hover:bg-border flex gap-1 "
        >
          <input
            type="search"
            placeholder="Search"
            className="w-[73px] bg-transparent focus:outline-none text-muted-foreground"
          />
          <Button className="bg-transparent text-muted-foreground px-0">
            Press
            <span className="w-8 h-6 text-xs text-muted-foreground flex items-center justify-center rounded-[4px] bg-black py-0.5 px-1.5">
              ⌘ K
            </span>
          </Button>
        </div>
        <SearchCommand open={open} setOpen={setOpen} />
      </div>
      <div className="flex items-center gap-3">
        <div className="flex gap-2">
          <img
            src={DiamondLogo}
            width={"28px"}
            height={"28px"}
            className="object-contain"
            alt=""
          />
          <div className="flex flex-col">
            <span className="text-muted-foreground">
              Level {userInfo?.data?.data?.level || 1}
            </span>
            <span className="text-sm font-medium">
              {userInfo?.data?.data?.xp || 0} Point
            </span>
          </div>
        </div>
        <Separator orientation="vertical" className="h-9" />
        <ConnectWalletButton />
      </div>
    </div>
  );
};

export default Header;
