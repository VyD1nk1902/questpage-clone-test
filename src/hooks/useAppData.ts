import { missionApi } from "@/apis/mission.api";
import { userApi } from "@/apis/user.api";
import { useUserStore } from "@/stores/user.store";
import { useParams } from "react-router-dom";
import useSWR from "swr";

export const useAppData = (options?: {
  campaignId?: string;
  leaderboardType?: string;
  currentPage?: number;
  sizePage?: number;
  walletAddress?: string;
}) => {
  const { token } = useUserStore();
  const { slug } = useParams<{ slug: string }>();

  // Fetch user info
  const userInfo = useSWR(
    token ? ["userInfo", token] : null,
    userApi.getUserInfo,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // Fetch Leader Board
  const leaderBoard = useSWR(
    options?.leaderboardType
      ? [
          "leaderBoard",
          options.leaderboardType,
          options.currentPage,
          options.sizePage,
          options.walletAddress,
        ]
      : null,
    () =>
      missionApi.getLeaderBoard(
        options?.leaderboardType!,
        options?.currentPage,
        options?.sizePage,
        options?.walletAddress
      ),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // Fetch campaigns
  const campaigns = useSWR("campaigns", missionApi.getCampaigns, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  // Fetch campaign theo slug
  const campaignBySlug = useSWR(
    slug ? ["campaignBySlug", slug] : null,
    () => missionApi.getCampaignsBySlug(slug as string),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // Fetch mission theo campaign id — truyền từ ngoài vào
  const missionByCampaign = useSWR(
    options?.campaignId ? ["missionByCampaign", options?.campaignId] : null,
    () => missionApi.getMissionByCampaign(options?.campaignId as string),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    userInfo,
    campaigns,
    campaignBySlug,
    missionByCampaign,
    leaderBoard,
  };
};
