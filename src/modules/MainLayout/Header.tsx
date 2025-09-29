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

const Header = () => {
  const deviceType = useDeviceType();
  const navigate = useNavigate();

  const location = useLocation();
  const param = useParams();

  return (
    <div
      className={cn(
        "w-full max-w-screen py-3 flex fixed top-0 left-0 right-0 z-50 bg-background shrink-0 items-center gap-2 border-b h-[65px]"
      )}
    ></div>
  );
};

export default Header;
