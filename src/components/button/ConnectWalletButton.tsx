import React, { useEffect, useState } from "react";
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
import { useWallet } from "@solana/wallet-adapter-react";
import { CaretRight, Gear, SignOut, User } from "@phosphor-icons/react";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import { showInfoToast, showSuccessToast } from "@/utils/toast.utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { userApi } from "@/apis/user.api";
import bs58 from "bs58";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getShortAddress } from "@/utils/common-utils";
import useApi from "@/hooks/useApi";
import { useUserStore } from "@/stores/user.store";
import SettingUserModal from "../modal/SettingUserModal";
import instance from "@/apis/instance";

const ConnectWalletButton = () => {
  const { wallet, wallets, select, connect, connected, publicKey, disconnect } =
    useWallet();
  const [checked, setChecked] = useState(false);
  const { token, setToken } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { data, mutate } = useApi(token ? userApi.getUserInfo : null);
  const [openDialog, setOpenDialog] = useState(false);
  const nameWallet = [
    {
      title: "MetaMask",
    },

    {
      title: "Bitget Wallet",
    },

    {
      title: "Phantom",
    },

    {
      title: "Solflare",
    },
  ];

  //Check Phantom Provider
  const getPhantomProvider = () => {
    const anyWindow: any = window;
    if (anyWindow.phantom?.ethereum && anyWindow.phantom?.ethereum.isPhantom) {
      return anyWindow.phantom.ethereum;
    }
    window.open("https://phantom.app/download", "_blank");
    return null;
  };

  // Check MetaMask Provider
  const getMetaMaskProvider = () => {
    const anyWindow: any = window;
    if (anyWindow.ethereum && anyWindow.ethereum.isMetaMask) {
      return anyWindow.ethereum;
    }
    window.open("https://metamask.io/download.html", "_blank");
    return null;
  };

  // Check Bitget Provider
  const getBitgetProvider = () => {
    const anyWindow: any = window;
    const provider =
      anyWindow.bitkeep?.ethereum ||
      anyWindow.bitget?.ethereum ||
      anyWindow.ethereum;

    if (provider) {
      return provider;
    }

    window.open("https://web3.bitget.com/en/wallet-download", "_blank");
    return null;
  };

  useEffect(() => {
    const connectWallet = async () => {
      try {
        await connect();

        if (!token && publicKey) {
          setLoading(true);
          console.log("publicKey", publicKey.toBase58());

          const createMessage = await userApi.createSignature(
            publicKey.toBase58()
          );
          const message = new TextEncoder().encode(createMessage.message);

          const signedMessage = await (wallet?.adapter as any).signMessage?.(
            message
          );

          const signatureBase58 = bs58.encode(signedMessage);

          const dataUser = await userApi.register(
            publicKey.toBase58(),
            signatureBase58,
            createMessage.message,
            ""
          );
          console.log("dataUser", dataUser);
          setToken(dataUser.user.token);

          mutate(dataUser.user);
          showSuccessToast("Connect Wallet Success!");
          setOpen(false);
        }
      } catch (err: any) {
        console.error("Connect/Sign error:", err);
        showInfoToast(
          "Connect Wallet",
          "Please open Phantom Wallet and log in to continue!"
        );
        setToken(null);

        await disconnect();
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    if (wallet) {
      connectWallet();
    }
  }, [wallets, publicKey]);

  const handleDisconnect = async () => {
    try {
      setToken(null);
      await disconnect();
      console.log("Wallet disconnected");
      showInfoToast("Disconnect Wallet", "You have disconnected your wallet!");
    } catch (err) {
      console.error("Disconnect error:", err);
    }
  };

  const handleConnectWallet = async (wallet: any) => {
    if (wallet?.adapter?.name == "Phantom") {
      const provider = getPhantomProvider();
      if (!provider) return;
    }
    if (wallet?.adapter?.name == "MetaMask") {
      const provider = getMetaMaskProvider();
      if (!provider) return;
    }
    if (wallet?.adapter?.name == "Bitget Wallet") {
      const provider = getBitgetProvider();
      if (!provider) return;
    }

    await select(wallet?.adapter?.name);
  };

  useEffect(() => {
    console.log("user", data?.data);
  }, [token]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!token ? (
        <Button className="!rounded-[6px] w-fit" onClick={() => setOpen(true)}>
          Login
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                src={data?.data?.avatar || "https://github.com/shadcn.png"}
                alt="@shadcn"
              />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-accent min-w-[200px] overflow-hidden">
            <DropdownMenuLabel className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={data?.data.avatar || "https://github.com/shadcn.png"}
                  alt="@shadcn"
                />
              </Avatar>
              <div className="flex flex-col">
                <span>{getShortAddress(data?.data?.walletAddress || "")}</span>
                <span className="text-xs opacity-60">m@example.com</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer hover:!bg-border">
              <User size={16} /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer hover:!bg-border"
              onSelect={(e) => {
                e.preventDefault();
                setOpenDialog(true);
              }}
            >
              <div className="w-full flex gap-2 items-center">
                <Gear size={16} />
                <span>Setting</span>
              </div>
            </DropdownMenuItem>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <SettingUserModal />
            </Dialog>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleDisconnect}
              className="cursor-pointer hover:!bg-border"
            >
              <SignOut size={16} />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <DialogContent className="w-80 max-w-2xl bg-accent !rounded-2xl">
        <DialogHeader className="flex flex-col items-center gap-3">
          <DialogTitle className="text-2xl">Login With</DialogTitle>
          <DialogDescription className="text-xs">
            Choose a network
          </DialogDescription>
        </DialogHeader>

        <div className="w-full flex flex-col gap-3">
          {nameWallet.map((item, index) => {
            const wallet = wallets.find((w) => w.adapter.name === item.title);
            return (
              <Button
                key={index}
                className="w-full px-4 py-2 flex gap-2 items-center justify-between bg-background rounded-lg"
                disabled={checked ? false : true}
                onClick={() => handleConnectWallet(wallet)}
              >
                <img
                  src={wallet?.adapter.icon}
                  alt={wallet?.adapter.name}
                  className="w-6 h-6 object-contain"
                ></img>
                <span className="w-full whitespace-nowrap">
                  Continue With {wallet?.adapter?.name}
                </span>
                <CaretRight className="w-4 h-4 object-contain" />
              </Button>
            );
          })}
          <div></div>
        </div>

        <Separator />

        <div className="w-full flex items-start gap-3 p-3">
          <Checkbox
            checked={checked}
            onCheckedChange={() => setChecked(!checked)}
            className="border-border rounded-[4px]"
          />
          <div className="grid gap-2">
            <span>Accept terms and conditions</span>
            <p className="text-muted-foreground text-xs">
              By clicking this checkbox, you agree to the terms and conditions.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectWalletButton;
