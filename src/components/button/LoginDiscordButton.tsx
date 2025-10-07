import React from "react";
import { Button } from "../ui/button";

const LoginDiscordButton = () => {
  const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
  const redirectUri = "http://localhost:3000/auth/discord/callback";
  const scope = "identify email";
  const state = "random_string_state";

  const loginWithDiscord = () => {
    const url = `https://discord.com/api/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scope)}&state=${state}`;

    window.location.href = url;
  };

  return (
    <Button onClick={loginWithDiscord} className="px-4 py-2 w-fit rounded">
      Login with Discord
    </Button>
  );
};

export default LoginDiscordButton;
