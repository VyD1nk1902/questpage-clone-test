import { create } from "zustand";

interface MissionState {
  isClaimCampaign: boolean;
  setIsClaimCampaign: (isClaim: boolean) => void;
}

export const useMissionStore = create<MissionState>((set) => ({
  isClaimCampaign: false,
  setIsClaimCampaign: (isClaim: boolean) => {
    set({ isClaimCampaign: isClaim });
  },
}));
