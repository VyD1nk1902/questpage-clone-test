import useDeviceType from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
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

const EXPANDED_WIDTH = "16rem"; // Tương đương SIDEBAR_WIDTH
const COLLAPSED_WIDTH = "3rem"; // Tương đương SIDEBAR_WIDTH_ICON

const Header = () => {
  const deviceType = useDeviceType();
  const navigate = useNavigate();

  const location = useLocation();
  const param = useParams();

  const { state, isMobile } = useSidebar();

  const currentWidth = isMobile
    ? "0px"
    : state === "collapsed"
    ? COLLAPSED_WIDTH
    : EXPANDED_WIDTH;

  return (
    <div
      className={cn(
        "py-3 px-3 flex justify-between fixed top-0 z-50 bg-accent shrink-0 items-center gap-2 border-b h-[65px]",
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
        <Button className="w-full h-[36px] bg-input !rounded-[6px] border border-white flex gap-1">
          <input
            type="search"
            placeholder="Search"
            className="w-[73px] bg-transparent focus:outline-none"
          />
          <Button className="bg-transparent">Press</Button>
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex gap-2">
          <img
            src="/public/Mission/diamond-logo.png"
            width={"28px"}
            height={"28px"}
            className="object-contain"
            alt=""
          />
          <div className="flex flex-col">
            <span className="text-muted-foreground">Loyalty</span>
            <span className="text-sm font-medium">1000 Point</span>
          </div>
        </div>
        <img src="/public/Line (Stroke).svg" className="mx-1" alt="" />
        <ConnectWalletButton />
      </div>
    </div>
  );
};

export default Header;
