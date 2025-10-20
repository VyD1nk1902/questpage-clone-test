import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CopyIcon,
  DiscordLogoIcon,
  TelegramLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LineVertical } from "@/constants/image.constant";
import LeaderboardSheet from "@/components/sheet/LeaderboardSheet";
import { useParams } from "react-router-dom";
import useApi from "@/hooks/useApi";
import { missionApi } from "@/apis/mission.api";
import { getFormatDateToDay } from "@/utils/common-utils";
import { useAppData } from "@/hooks/useAppData";
import useDeviceType from "@/hooks/useMediaQuery";
import useShare from "@/hooks/useShare";

const ArcherHunter = () => {
  const { campaignBySlug } = useAppData();
  const deviceType = useDeviceType();
  const { share } = useShare();
  const title = campaignBySlug?.data?.data.name || "Check out this campaign!";
  const url = window.location.href;
  return (
    <div className="flex px-6 max-[350px]:px-2 flex-col align-start gap-3">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Campaign</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {campaignBySlug?.data?.data.name || ""}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <span className="sm:text-5xl text-3xl font-bold">
        {campaignBySlug?.data?.data.name || ""}
      </span>

      {deviceType == "desktop" ? (
        <div className="flex items-center gap-3">
          <LeaderboardSheet />
          <span className="text-center text-muted-foreground">5.47K</span>
          <img
            className="h-9 mx-1 my-1 justify-center align-center"
            src={LineVertical}
            alt=""
          />

          <Collapsible className="min-w-[260px]">
            <div className="flex justify-start items-center content-center gap-2 flex-1 flex-shrink-0 basis-0 flex-wrap">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <ChevronsUpDown />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
              <h4 className="text-sm font-medium text-muted-foreground">
                {getFormatDateToDay(campaignBySlug?.data?.data.startDate)} -{" "}
                {getFormatDateToDay(campaignBySlug?.data?.data.endDate)}
              </h4>
            </div>
            <CollapsibleContent className="text-sm font-medium text-muted-foreground">
              17:00 GMT+07:00
            </CollapsibleContent>
          </Collapsible>

          <Button
            variant={"icon"}
            size={"icon"}
            className="!rounded bg-input border border-white/10 hover:bg-white/20 [box-shadow:0_1px_2px_0_var(--muted)]"
          >
            <DiscordLogoIcon size={32} weight="fill" color="white" />
          </Button>
          <Button
            variant={"icon"}
            size={"icon"}
            className="!rounded bg-input border border-white/10 hover:bg-white/20 [box-shadow:0_1px_2px_0_var(--muted)]"
          >
            <XLogoIcon size={32} weight="light" color="white" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger className="bg-primary text-sm font-medium px-3 h-7 rounded-[6px] hover:bg-[#0284c7]/80">
              Share
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Share to</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => share("x", { title, url })}>
                <XLogoIcon /> Share to X
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => share("telegram", { title, url })}
              >
                <TelegramLogoIcon /> Share to Telegram
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => share("discord", { title, url })}
              >
                <DiscordLogoIcon /> Share to Discord
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => share("copy", { title, url })}>
                <CopyIcon weight="fill" color="white" /> Copy Link
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-start gap-3">
          <div className="flex gap-2 justify-center items-center">
            <span>Timeline:</span>
            <Collapsible className="min-w-[260px]">
              <div className="flex justify-start items-center content-center gap-2 flex-1 flex-shrink-0 basis-0 flex-wrap">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <ChevronsUpDown />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
                <h4 className="text-sm font-medium text-muted-foreground">
                  {getFormatDateToDay(campaignBySlug?.data?.data.startDate)} -{" "}
                  {getFormatDateToDay(campaignBySlug?.data?.data.endDate)}
                </h4>
              </div>
              <CollapsibleContent className="text-sm font-medium text-muted-foreground">
                17:00 GMT+07:00
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className="w-full flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <LeaderboardSheet />
              <span className="text-center text-muted-foreground">5.47K</span>
            </div>
            <div className="flex gap-3">
              <Button
                variant={"icon"}
                size={"icon"}
                className="!rounded bg-input border border-white/10 hover:bg-white/20 [box-shadow:0_1px_2px_0_var(--muted)]"
              >
                <DiscordLogoIcon size={32} weight="fill" color="white" />
              </Button>
              <Button
                variant={"icon"}
                size={"icon"}
                className="!rounded bg-input border border-white/10 hover:bg-white/20 [box-shadow:0_1px_2px_0_var(--muted)]"
              >
                <XLogoIcon size={32} weight="light" color="white" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger className="bg-primary text-sm font-medium px-3 h-7 rounded-[6px] hover:bg-[#0284c7]/80">
                  Share
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Share to</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => share("x", { title, url })}>
                    <XLogoIcon /> Share to X
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => share("telegram", { title, url })}
                  >
                    <TelegramLogoIcon /> Share to Telegram
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => share("discord", { title, url })}
                  >
                    <DiscordLogoIcon /> Share to Discord
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => share("copy", { title, url })}
                  >
                    <CopyIcon weight="fill" color="white" /> Copy Link
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArcherHunter;
