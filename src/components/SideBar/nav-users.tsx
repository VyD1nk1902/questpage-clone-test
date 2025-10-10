"use client";

import {
  BadgeCheck,
  Bell,
  Check,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Plus,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "../ui/separator";
import { userApi } from "@/apis/user.api";
import { getShortAddress } from "@/utils/common-utils";
import useApi from "@/hooks/useApi";
import { useState } from "react";
import { useUserStore } from "@/stores/user.store";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    code: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();

  const { token } = useUserStore();
  const { data } = useApi(token ? userApi.getUserInfo : null);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar>
                <AvatarImage
                  src={data?.data.avatar || "https://github.com/shadcn.png"}
                  alt={data?.data.username || ""}
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {data?.data.username}
                </span>
                <span className="truncate text-xs">
                  {getShortAddress(data?.data.walletAddress || "")}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-[10px] p-2"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <DropdownMenuItem>Switch Account</DropdownMenuItem>
            </DropdownMenuLabel>
            <Separator className="my-2" />
            <DropdownMenuGroup>
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar>
                  <AvatarImage
                    src={data?.data.avatar || "https://github.com/shadcn.png"}
                    alt={data?.data.username || ""}
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {data?.data.username || ""}
                  </span>
                  <span className="truncate text-xs">
                    {getShortAddress(data?.data.walletAddress || "")}
                  </span>
                </div>
                <Check size={20} />
              </div>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Plus />
              Add Account
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
