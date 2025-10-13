import instance from "./instance";

const route = "/mission";

export const missionApi = {
  getCampaigns: `${route}/campaigns`,

  getCampaignsBySlug: (slug: string) => `${route}/campaigns/${slug}`,

  getMissionByCampaign: (id: string) => `${route}/${id}`,

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
