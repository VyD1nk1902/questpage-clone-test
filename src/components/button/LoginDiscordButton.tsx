import React from "react";
import { Button } from "../ui/button";
import { CaretRight, DiscordLogo } from "@phosphor-icons/react";

const LoginDiscordButton = () => {
  const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
  const redirectUri = `${import.meta.env.VITE_URL}/auth/discord/callback`;
  const scope = "identify email";
  const state = "random_string_state";

  const loginWithDiscord = () => {
    const url = `https://discord.com/api/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scope)}&state=${state}`;

    window.location.href = url;
  };

  return (
    <div
      className="w-full h-10 flex items-center justify-between px-4 bg-background border border-border rounded-lg cursor-pointer hover:opacity-80"
      onClick={loginWithDiscord}
    >
      <DiscordLogo className="text-[#434EE3] w-6 h-6" weight="fill" />
      <span className="text-sm">Link To Discord</span>
      <CaretRight />
    </div>
  );
};

export default LoginDiscordButton;
