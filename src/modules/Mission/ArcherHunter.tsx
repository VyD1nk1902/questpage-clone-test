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
import { ChevronsUpDown } from "lucide-react";
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

const ArcherHunter = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useApi(slug ? missionApi.getCampaignsBySlug(slug) : null);
  return (
    <div className="flex px-6 flex-col align-start gap-3">
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
            <BreadcrumbPage>{data?.data.name || ""}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <span className="text-5xl font-bold">{data?.data.name || ""}</span>

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
              {getFormatDateToDay(data?.data.startDate)} -{" "}
              {getFormatDateToDay(data?.data.endDate)}
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
            <DropdownMenuItem>
              <XLogoIcon /> Share to X
            </DropdownMenuItem>
            <DropdownMenuItem>
              <TelegramLogoIcon /> Share to Telegram
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DiscordLogoIcon /> Share to Discord
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CopyIcon weight="fill" color="white" /> Copy Link
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ArcherHunter;
