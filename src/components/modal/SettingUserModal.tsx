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

interface IProps {
  selectedTab?: string;
}

const SettingUserModal = (props: IProps) => {
  const { selectedTab } = props;
  const { token, files } = useUserStore();
  const { data, mutate } = useApi(token ? userApi.getUserInfo : null);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
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
      let urlAvatar;
      if (files[0]) {
        urlAvatar = await userApi.uploadImageDirect(files[0]);
      }
      const data = await userApi.updateUser(userName, urlAvatar);
      if (data) {
        mutate({
          ...(userName && { username: userName }),
          ...(urlAvatar && { avatar: urlAvatar }),
        });
        showSuccessToast("User update!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent className="!max-w-2xl flex p-0 bg-input">
      <div className="w-[210px] min-w-[210px] flex flex-col p-6 gap-5 items-center border-r border-border">
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          Account preview
        </span>
        <div className="w-full flex flex-col gap-2 items-center">
          <Avatar className="w-[64px] h-[64px] object-cover">
            <AvatarImage
              className="object-cover"
              src={data?.data.avatar || "https://github.com/shadcn.png"}
              alt="@shadcn"
            />
          </Avatar>
          <span className="text-lg font-medium line-clamp-1">
            {data?.data.username}
          </span>
          <span className="text-xs text-muted-foreground">
            {getShortAddress(data?.data.walletAddress)}
          </span>
          <Separator />
          <div className="w-full grid grid-cols-4">
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
      <div className="w-full p-6">
        <Tabs defaultValue="account" value={selectedTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger
              value="account"
              className="data-[state=active]:bg-accent"
            >
              Account Setting
            </TabsTrigger>
            <TabsTrigger
              value="social"
              className="data-[state=active]:bg-accent"
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
              <LoginDiscordButton />

              <LoginTwitterButton />

              <LoginTelegramButton />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DialogContent>
  );
};

export default SettingUserModal;
