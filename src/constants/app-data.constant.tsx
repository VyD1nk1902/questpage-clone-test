import {
  ArrowsLeftRight,
  MegaphoneSimple,
  Receipt,
  Wallet,
} from "@phosphor-icons/react";

export const APP_STORAGE_KEY = {
  walletAddress: "wallet-address-storage",
  accessToken: "access-token",
};

export const menuData = [
  {
    item_title: "P2P",
    item_link: "/",
    icon: ArrowsLeftRight,
  },

  {
    item_title: "My Orders",
    item_link: "/my-order",
    icon: Receipt,
  },

  {
    item_title: "My Ads",
    item_link: "/my-ads",
    icon: MegaphoneSimple,
  },

  {
    item_title: "Wallet",
    item_link: "/wallet",
    icon: Wallet,
  },
];
