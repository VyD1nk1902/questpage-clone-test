import LocalCampaign from "@/apis/campaign.json";
import useApi from "./useApi";

export interface Campaign {
  id: string;
  background: string;
  title: string;
  desc: string;
}

async function fetchCampaign(): Promise<Campaign[]> {
  const res = await fetch("api/campaign");
  if (!res.ok) throw new Error("Failed to fetch Campaign");
  return res.json();
}

export default function useFetchData() {
  const { data, error, isLoading } = useApi("api/campaign", "campaign");

  const campaign = data ?? LocalCampaign;

  return { campaign, loading: isLoading, error };
}
