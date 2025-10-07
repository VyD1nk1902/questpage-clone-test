import instance from "@/apis/instance";
import React, { useEffect } from "react";
import TelegramLoginButton, { TelegramUser } from "telegram-login-button";

const LoginTelegramButton = () => {
  return (
    <TelegramLoginButton
      botName={import.meta.env.VITE_BOT_NAME}
      dataOnauth={(user: TelegramUser) => {
        instance
          .post(`${import.meta.env.VITE_API_URL}/data-telegram`, user)
          .then((res) => {
            console.log("Telegram user:", user);
          })
          .catch((err) => {
            console.error("Error fetching Discord user:", err);
          });
      }}
    />
  );
};

export default LoginTelegramButton;
