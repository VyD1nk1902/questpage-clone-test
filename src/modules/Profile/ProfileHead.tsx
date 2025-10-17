import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SettingUserModal from "@/components/modal/SettingUserModal";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ethLogo, LineVertical, DiamondLogo } from "@/constants/image.constant";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ClockIcon } from "@phosphor-icons/react";
import { Progress } from "@/components/ui/progress";
import { useUserStore } from "@/stores/user.store";
import useApi from "@/hooks/useApi";
import { userApi } from "@/apis/user.api";
import { getFormatDateToDay, getShortAddress } from "@/utils/common-utils";
import { getTotalXPByLevel, getXpByLevel } from "@/utils/level";
import { useAppData } from "@/hooks/useAppData";
import { cn } from "@/lib/utils";
import useDeviceType from "@/hooks/useMediaQuery";

const ProfileHead = () => {
  const { userInfo } = useAppData();
  const deviceType = useDeviceType();
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <Breadcrumb className="px-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Profile</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">
              {userInfo.data?.data?.username || "-"}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div
        className={cn(
          "w-full flex gap-6 px-6",
          deviceType == "desktop" ? "justify-between items-end" : "flex-col"
        )}
      >
        <div className="flex gap-6">
          <Avatar className="w-16 h-16">
            <AvatarImage
              className="w-full h-full object-cover"
              src={
                userInfo.data?.data?.avatar || "https://github.com/shadcn.png"
              }
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2 justify-center">
            <span className="text-lg font-medium">
              {userInfo.data?.data?.username || "-"}
            </span>
            <div className="flex gap-3 p-1 pr-3 bg-secondary rounded-3xl">
              <img src={ethLogo} alt="eth-logo" />
              <span className="text-sm font-medium text-muted-foreground">
                {getShortAddress(userInfo.data?.data?.walletAddress || "") ||
                  "-"}
              </span>
            </div>
          </div>
        </div>
        <Button
          variant={"outline"}
          size={"default"}
          className="bg-accent hover:bg-border w-[105px]"
          onClick={(e) => {
            e.preventDefault();
            setOpenDialog(true);
          }}
        >
          Edit Profile
        </Button>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <SettingUserModal />
      </Dialog>
      <Separator />
      {deviceType == "desktop" ? (
        <div className="px-6 flex gap-6">
          <div className="flex gap-3 justify-center items-center">
            <div className="bg-secondary rounded-full flex justify-center items-center w-7 h-7">
              <ClockIcon size={16} color="#e7e2e9" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground">
                Join at
              </span>
              <span className="text-sm font-medium">
                {getFormatDateToDay(userInfo.data?.data?.createdAt || "")}
              </span>
            </div>
          </div>
          <img src={LineVertical} alt="line-separator" />
          <div className="w-[60%] flex gap-3 justify-center items-center">
            <img src={DiamondLogo} className="w-7 h-7" alt="diamond-logo" />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground">
                Total Loyalty
              </span>
              <span className="text-sm font-medium">
                {getTotalXPByLevel(userInfo.data?.data?.level || 0) +
                  (userInfo.data?.data?.xp || 0)}{" "}
                Point
              </span>
            </div>
          </div>
          <img src={LineVertical} alt="line-separator" />
          <div className="w-full flex flex-col gap-2 justify-center">
            <div className="flex justify-between">
              <span>Lv {userInfo.data?.data?.level || 1}</span>
              <span>
                {userInfo.data?.data?.xp || 0}/
                {getXpByLevel(userInfo.data?.data?.level + 1 || 1)}XP
              </span>
            </div>
            <Progress
              value={
                (Number(userInfo.data?.data?.xp || 0) /
                  Number(getXpByLevel(userInfo.data?.data?.level + 1 || 1))) *
                100
              }
            />
          </div>
        </div>
      ) : (
        <div className="px-3 flex flex-col gap-6">
          <div className="flex gap-6 items-center">
            <div className="flex gap-3 items-center">
              <div className="bg-secondary rounded-full flex justify-center items-center w-7 h-7">
                <ClockIcon size={16} color="#e7e2e9" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-muted-foreground">
                  Join at
                </span>
                <span className="text-sm font-medium">
                  {getFormatDateToDay(userInfo.data?.data?.createdAt || "")}
                </span>
              </div>
            </div>
            <div className="flex gap-3 justify-center items-center">
              <img src={DiamondLogo} className="w-7 h-7" alt="diamond-logo" />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-muted-foreground">
                  Total Loyalty
                </span>
                <span className="text-sm font-medium">
                  {getTotalXPByLevel(userInfo.data?.data?.level || 0) +
                    (userInfo.data?.data?.xp || 0)}{" "}
                  Point
                </span>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-2 justify-center">
            <div className="flex justify-between">
              <span>Lv {userInfo.data?.data?.level || 1}</span>
              <span>
                {userInfo.data?.data?.xp || 0}/
                {getXpByLevel(userInfo.data?.data?.level + 1 || 1)}XP
              </span>
            </div>
            <Progress
              value={
                (Number(userInfo.data?.data?.xp || 0) /
                  Number(getXpByLevel(userInfo.data?.data?.level + 1 || 1))) *
                100
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHead;
