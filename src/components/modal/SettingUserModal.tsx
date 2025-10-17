import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import {
  Gear,
  EnvelopeSimple,
  XLogo,
  DiscordLogo,
  TelegramLogo,
  CaretRight,
  XLogoIcon,
  SpinnerGap,
} from "@phosphor-icons/react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useUserStore } from "@/stores/user.store";
import useApi from "@/hooks/useApi";
import { userApi } from "@/apis/user.api";
import { Separator } from "../ui/separator";
import { getShortAddress } from "@/utils/common-utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileInput } from "../FileInput";
import LoginDiscordButton from "../button/LoginDiscordButton";
import LoginTwitterButton from "../button/LoginTwitterButton";
import LoginTelegramButton from "../button/LoginTelegramButton";
import { showSuccessToast } from "@/utils/toast.utils";
import { useAppData } from "@/hooks/useAppData";
import { useUpdateData } from "@/hooks/useUpdateData";
import useDeviceType from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

interface IProps {
  selectedTab?: string;
}

const SettingUserModal = (props: IProps) => {
  const { selectedTab } = props;
  const { files } = useUserStore();
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const { userInfo } = useAppData();
  const { updateUserInfo, updateLeaderBoard } = useUpdateData();
  const deviceType = useDeviceType();

  const linkSocial = [
    {
      icon: EnvelopeSimple,
      link: "#",
    },

    {
      icon: XLogo,
      link: "#",
    },

    {
      icon: DiscordLogo,
      link: "#",
    },

    {
      icon: TelegramLogo,
      link: "#",
    },
  ];

  const changeDataUser = async () => {
    try {
      setLoading(true);
      let urlAvatar: any;
      if (files[0]) {
        urlAvatar = await userApi.uploadImageDirect(files[0]);
      }
      const data = await userApi.updateUser(userName, urlAvatar);
      if (userInfo.data) {
        updateUserInfo({ username: userName, avatar: urlAvatar });

        updateLeaderBoard({ username: userName, avatar: urlAvatar });

        showSuccessToast("User update!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnectSocial = async (typeSocial: string) => {
    try {
      const res = await userApi.disconnectSocial(typeSocial);
      if (res) {
        if (typeSocial == "discord") {
          updateUserInfo({ discord: null });
        }

        if (typeSocial == "twitter") {
          updateUserInfo({ twitter: null });
        }

        if (typeSocial == "telegram") {
          updateUserInfo({ telegram: null });
        }

        showSuccessToast("Disconnect Success!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DialogContent
      className={cn(
        "flex p-0 bg-input",
        deviceType == "desktop"
          ? "!max-w-2xl flex-row"
          : "flex-col !max-w-lg max-sm:!max-w-sm max-[375px]:!max-w-[300px] max-sm:rounded-[8px] overflow-y-auto max-h-[70vh] !gap-0"
      )}
    >
      <div
        className={cn(
          "flex flex-col p-6 gap-5 items-center ",
          deviceType == "desktop"
            ? "min-w-[210px] w-[210px]  border-r border-border"
            : "mx-auto w-full"
        )}
      >
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          Account preview
        </span>
        <div className="w-full flex flex-col gap-2 items-center">
          <div
            className={cn(
              "flex",
              deviceType == "desktop"
                ? "flex-col items-center gap-2"
                : "items-center justify-center gap-2"
            )}
          >
            <Avatar className="w-[64px] h-[64px] object-cover">
              <AvatarImage
                className="object-cover"
                src={
                  userInfo.data?.data?.avatar || "https://github.com/shadcn.png"
                }
                alt="@shadcn"
              />
            </Avatar>
            <div
              className={cn(
                "flex flex-col gap-2 justify-center",
                deviceType == "desktop" && "items-center"
              )}
            >
              <span className="text-lg font-medium line-clamp-1">
                {userInfo.data?.data?.username}
              </span>
              <span className="text-xs text-muted-foreground">
                {getShortAddress(userInfo.data?.data?.walletAddress || "")}
              </span>
            </div>
          </div>
          <Separator
            className={deviceType == "desktop" ? "w-[90%]" : "w-[80%]"}
          />
          <div
            className={cn(
              "grid grid-cols-4 place-items-center gap-3",
              deviceType == "desktop" ? "w-full" : "max-w-[150px]"
            )}
          >
            {linkSocial.map((item: any, index: number) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="w-7 h-7 rounded-full border border-border flex items-center justify-center"
                >
                  <Icon className="w-4 h-4 object-contain" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full p-6 max-sm:p-3">
        <Tabs
          defaultValue="account"
          value={selectedTab}
          className={cn(
            "w-full",
            deviceType == "desktop"
              ? ""
              : "!flex flex-col items-center w-[60%] mx-auto max-[375px]:w-[250px]"
          )}
        >
          <TabsList className="mb-6 max-[375px]:gap-2">
            <TabsTrigger
              value="account"
              className="data-[state=active]:bg-accent max-[375px]:!px-1"
            >
              Account Setting
            </TabsTrigger>
            <TabsTrigger
              value="social"
              className="data-[state=active]:bg-accent max-[375px]:!px-1"
            >
              Social Connect
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="w-full h-[420px]">
            <div className="grid w-full max-w-sm items-center gap-3">
              <span className="text-sm">Change Username</span>
              <Input
                placeholder="Username"
                className="bg-popover"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="w-full max-w-sm flex flex-col items-start gap-3 min-h-[300px] mt-3">
              <span className="text-sm">Change Avatar</span>
              <FileInput />
            </div>

            <Button
              className="!h-7 !min-h-7 w-full mt-3"
              onClick={changeDataUser}
              disabled={loading ? true : false}
            >
              {loading ? (
                <SpinnerGap
                  size={32}
                  className="text-primary-foreground animate-spin"
                />
              ) : (
                "Save"
              )}
            </Button>
          </TabsContent>

          <TabsContent value="social" className="w-full h-[420px]">
            <div className="grid w-full max-w-sm items-center gap-3">
              <span className="text-sm">Verify Email</span>
              <div className="flex w-full items-center bg-popover rounded-xl">
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="bg-popover !border-none"
                />
                <Button className="px-2 !h-6 !min-h-6 mr-3">Send</Button>
              </div>
            </div>

            <Separator className="my-3" />

            <div className="w-full max-w-sm flex flex-col items-start gap-3 mt-3">
              <span className="text-sm">Link Social account</span>

              {userInfo.data?.data?.discord?.username ? (
                <div className="w-full h-10 flex items-center justify-between max-sm:px-2 px-4 bg-background border border-border rounded-lg">
                  <div className="w-fit items-center flex gap-3 max-sm:gap-1">
                    <DiscordLogo
                      className="text-[#434EE3] w-6 h-6"
                      weight="fill"
                    />
                    <span className="text-sm truncate w-[80px] lg:w-[120px]">
                      {userInfo.data?.data?.discord?.username}
                    </span>
                  </div>

                  <Button
                    className="w-fit max-sm:w-[40%] !h-6 !min-h-6 !text-xs hover:opacity-80"
                    onClick={() => handleDisconnectSocial("discord")}
                  >
                    Disconnect
                  </Button>
                </div>
              ) : (
                <LoginDiscordButton />
              )}

              {userInfo.data?.data?.twitter?.username ? (
                <div className="w-full h-10 flex items-center justify-between max-sm:px-2 px-4 bg-background border border-border rounded-lg">
                  <div className="w-fit items-center flex gap-3 max-sm:gap-1">
                    <XLogoIcon className="w-6 h-6" />
                    <span className="text-sm truncate w-[80px] lg:w-[120px]">
                      {userInfo.data?.data?.twitter?.username}
                    </span>
                  </div>

                  <Button
                    className="w-fit max-sm:w-[40%] !h-6 !min-h-6 !text-xs hover:opacity-80"
                    onClick={() => handleDisconnectSocial("twitter")}
                  >
                    Disconnect
                  </Button>
                </div>
              ) : (
                <LoginTwitterButton />
              )}

              {userInfo.data?.data?.telegram?.username ? (
                <div className="w-full h-10 flex items-center justify-between px-4 bg-background border border-border rounded-lg">
                  <div className="w-fit items-center flex gap-3">
                    <TelegramLogo className="w-4 h-4" weight="fill" />
                    <span className="text-sm">
                      {userInfo.data?.data?.telegram?.username}
                    </span>
                  </div>

                  <Button
                    className="w-fit !h-6 !min-h-6 !text-xs hover:opacity-80"
                    onClick={() => handleDisconnectSocial("telegram")}
                  >
                    Disconnect
                  </Button>
                </div>
              ) : (
                <LoginTelegramButton />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DialogContent>
  );
};

export default SettingUserModal;
