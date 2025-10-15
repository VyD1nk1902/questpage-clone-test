import instance from "./instance";

const route = "/mission";

export const missionApi = {
  getCampaigns: () =>
    instance.get(`${route}/campaigns`).then((res) => res.data),

  getCampaignsBySlug: (slug: string) =>
    instance.get(`${route}/campaigns/${slug}`).then((res) => res.data),

  getMissionByCampaign: (id: string) =>
    instance.get(`${route}/${id}`).then((res) => res.data),

  getLeaderBoard: (
    type: string,
    currentPage?: number,
    sizePage?: number,
    walletAddress?: string
  ) =>
    instance
      .get(
        `${route}/leaderboard?type=${type}&currentPage=${currentPage}&sizePage=${sizePage}&walletAddress=${walletAddress}`
      )
      .then((res) => res.data),

  completeMission: async (missionId: string, point: number) => {
    const res = await instance.post(`${route}/complete`, {
      missionId: missionId,
      point: point,
    });
    return res.data;
  },

  claimMission: async (missionId: string) => {
    const res = await instance.post(`${route}/claim`, {
      missionId: missionId,
    });
    return res.data;
  },

  completeCampaign: async (campaignId: string) => {
    const res = await instance.post(`${route}/campaigns/complete`, {
      campaignId: campaignId,
    });
    return res.data;
  },

  claimCampaign: async (campaignId: string) => {
    const res = await instance.post(`${route}/campaigns/claim`, {
      campaignId: campaignId,
    });
    return res.data;
  },
};
