type Platform = "x" | "telegram" | "discord" | "copy";

interface shareData {
  url: string;
  title: string;
}

// TODO: implement share functionality

// Share Functions

const shareToX = ({ url, title }: shareData) => {
  const shareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent(title)}`;
  window.open(shareUrl, "_blank", "noopener,noreferrer");
};

const shareTelegram = ({ url, title }: shareData) => {
  const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent(title)}`;
  window.open(shareUrl, "_blank", "noopener,noreferrer");
};

// Discord does not have a direct share URL, so we copy the link to clipboard
const shareToDiscord = async ({ url, title }: shareData) => {
  const message = `${title}\n${url}`;
  try {
    await navigator.clipboard.writeText(message);
    alert("✅ Link copied! Now paste it into Discord.");
    window.open(
      "https://discord.com/channels/@me",
      "_blank",
      "noopener,noreferrer"
    );
  } catch (err) {
    console.error("❌ Failed to copy message for Discord:", err);
  }
};

const copyLink = async ({ url }: shareData) => {
  try {
    await navigator.clipboard.writeText(url);
    alert("✅ Link copied to clipboard!");
  } catch (err) {
    console.error("❌ Failed to copy link:", err);
  }
};

// Share Handlers Mapping keys to functions
const shareHandlers: Record<
  Platform,
  (data: shareData) => void | Promise<void>
> = {
  x: shareToX,
  telegram: shareTelegram,
  discord: shareToDiscord,
  copy: copyLink,
};

// Custom Hook
const useShare = () => {
  const share = (platform: Platform, data: shareData) => {
    const handler = shareHandlers[platform];
    if (!handler) {
      console.warn(`⚠️ Unsupported platform: ${platform}`);
      return;
    }
    handler(data);
  };

  return {
    share,
    ...shareHandlers,
  };
};

export default useShare;
