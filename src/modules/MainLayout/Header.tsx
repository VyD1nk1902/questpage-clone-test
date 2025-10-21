import useDeviceType from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AppSidebar } from "@/components/SideBar/AppSidebar";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import ConnectWalletButton from "@/components/button/ConnectWalletButton";
import { DiamondLogo } from "@/constants/image.constant";
import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/stores/user.store";
import useApi from "@/hooks/useApi";
import { userApi } from "@/apis/user.api";
import SearchCommand from "@/components/SearchCommand";
import { useAppData } from "@/hooks/useAppData";
import { Menu } from "lucide-react";

const EXPANDED_WIDTH = "16rem"; // Tương đương SIDEBAR_WIDTH
const COLLAPSED_WIDTH = "3rem"; // Tương đương SIDEBAR_WIDTH_ICON

const Header = ({
  setOpenDialog,
}: {
  setOpenDialog?: (value: boolean) => void;
}) => {
  const deviceType = useDeviceType();
  const navigate = useNavigate();

  const location = useLocation();
  const param = useParams();

  const { state, isMobile } = useSidebar();

  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const currentWidth = isMobile
    ? "0px"
    : state === "collapsed"
    ? COLLAPSED_WIDTH
    : EXPANDED_WIDTH;

  const { userInfo } = useAppData();

  return (
    <div
      className={cn(
        "w-full top-0 py-3 flex px-3 justify-between fixed z-[100] bg-accent items-center gap-2 border"
      )}
      style={{
        ...(deviceType == "desktop" && {
          left: currentWidth,
          width: `calc(100% - ${currentWidth})`,
          //transition để resize mượt mà
          transition: "width 0.2s ease-in-out, left 0.2s ease-in-out",
        }),
      }}
    >
      <div
        className={cn(
          "flex justify-center items-center",
          deviceType == "desktop" ? "gap-6" : "gap-3"
        )}
      >
        {deviceType == "desktop" ? (
          <SidebarTrigger />
        ) : (
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="bg-background flex min-w-10 h-10 rounded-[6px] justify-center items-center border border-border"
              >
                <Menu size={16} />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="z-[100] p-0 bg-sidebar border-r overflow-auto hide-scrollbar"
            >
              <AppSidebar
                collapsible="none"
                setOpen={setOpen}
                setOpenDialog={setOpenDialog}
                onClick={() => setOpen(false)}
              />
            </SheetContent>
          </Sheet>
        )}

        <div
          role="button"
          tabIndex={0}
          onClick={() => setOpenSearch(true)}
          // onKeyDown = {}
          className="w-full h-9 px-4 bg-white/10 !rounded-[6px] border border-white/10 hover:bg-border flex gap-1 "
        >
          <input
            type="search"
            placeholder="Search"
            className={cn(
              "bg-transparent focus:outline-none text-muted-foreground",
              deviceType == "desktop" ? "w-20" : "w-full"
            )}
          />
          {deviceType == "desktop" && (
            <Button className="bg-transparent text-muted-foreground px-0">
              Press
              <span className="w-8 h-6 text-xs text-muted-foreground flex items-center justify-center rounded-[4px] bg-black py-0.5 px-1.5">
                ⌘ K
              </span>
            </Button>
          )}
        </div>
        <SearchCommand open={openSearch} setOpen={setOpenSearch} />
      </div>
      <div className="flex items-center gap-3">
        {/* <div className="flex gap-2">
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
          </div> */}

        <Separator orientation="vertical" className="h-9" />
        <ConnectWalletButton setOpenDialog={setOpenDialog} />
      </div>
    </div>
  );
};

export default Header;
