import instance from "@/apis/instance";
import React from "react";
import TelegramLoginButton, { TelegramUser } from "telegram-login-button";
import { TelegramLogo, CaretRight } from "@phosphor-icons/react";
import useApi from "@/hooks/useApi";
import { userApi } from "@/apis/user.api";
import { useAppData } from "@/hooks/useAppData";
import { useUpdateData } from "@/hooks/useUpdateData";

const LoginTelegramButton = () => {
  const { userInfo } = useAppData();
  const { updateUserInfo } = useUpdateData();
  return (
    <div className="relative w-full">
      <div className="hidden">
        <TelegramLoginButton
          botName={import.meta.env.VITE_BOT_NAME}
          dataOnauth={(user: TelegramUser) => {
            instance
              .post(`${import.meta.env.VITE_API_URL}/data-telegram`, user)
              .then(() => {
                console.log("Telegram user:", user);

                updateUserInfo({ telegram: user });
              })
              .catch((err) =>
                console.error("Error fetching Telegram user:", err)
              );
          }}
        />
      </div>

      <div
        className="w-full h-10 flex items-center justify-between px-4 bg-background border border-border rounded-lg cursor-pointer hover:opacity-80"
        onClick={() => {
          const btn = document.querySelector<HTMLIFrameElement>(
            ".telegram-login iframe"
          );
          btn?.contentWindow?.postMessage("telegram_login", "*");
        }}
      >
        <div className="w-6 h-6 flex items-center justify-center bg-primary rounded-full">
          <TelegramLogo className="w-4 h-4" weight="fill" />
        </div>

        <span className="text-sm">Link To Telegram</span>
        <CaretRight />
      </div>
    </div>
  );
};

export default LoginTelegramButton;
