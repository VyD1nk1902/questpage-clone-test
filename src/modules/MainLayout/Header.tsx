import { Button } from "@/components/ui/button";
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
import ConnectWalletButton from "@/components/button/ConnectWalletButton";
import LoginTwitterButton from "@/components/button/LoginTwitterButton";
import LoginDiscordButton from "@/components/button/LoginDiscordButton";
import LoginTelegramButton from "@/components/button/LoginTelegramButton";

const Header = () => {
  const deviceType = useDeviceType();
  const navigate = useNavigate();

  const location = useLocation();
  const param = useParams();

  return (
    <div
      className={cn(
        "w-full max-w-screen px-6 flex fixed top-0 left-0 right-0 z-50 bg-background shrink-0 items-center gap-2 border-b h-[65px] justify-between"
      )}
    >
      <span>Logo</span>

      {/* <div className="w-fit flex gap-3 items-center">
        <LoginDiscordButton />
        <LoginTwitterButton />
        <LoginTelegramButton />
        <ConnectWalletButton />
      </div> */}
    </div>
  );
};

export default Header;
