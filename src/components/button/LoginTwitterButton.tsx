import React from "react";
import { Button } from "../ui/button";
import { CaretRight, XLogoIcon } from "@phosphor-icons/react";

const LoginTwitterButton = () => {
  const clientId = import.meta.env.VITE_TWITTER_CLIENT_ID;
  const redirectUri = `${import.meta.env.VITE_URL}/auth/twitter/callback`;
  const scope = "tweet.read users.read offline.access";
  const state = "random_string_state";

  function generateRandomString(length: number) {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
  }

  async function generateCodeChallenge(codeVerifier: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const base64 = btoa(String.fromCharCode(...hashArray))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
    return base64;
  }

  const loginWithTwitter = async () => {
    const codeVerifier = generateRandomString(128);
    localStorage.setItem("twitter_code_verifier", codeVerifier);

    const codeChallenge = await generateCodeChallenge(codeVerifier);

    const url = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(
      scope
    )}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

    window.location.href = url;
  };

  return (
    <div
      className="w-full h-10 flex items-center justify-between px-4 bg-background border border-border rounded-lg cursor-pointer hover:opacity-80"
      onClick={loginWithTwitter}
    >
      <XLogoIcon className="w-6 h-6" />
      <span className="text-sm">Link To X</span>
      <CaretRight />
    </div>
  );
};

export default LoginTwitterButton;
