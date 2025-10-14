import axios from "axios";
import instance from "./instance";

const route = "/user";

export const userApi = {
  getUserInfo: () => instance.get(`${route}/info`).then((res) => res.data),

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

  createSignature: async (address: string) => {
    const res = await instance.post(`${route}/create-signature`, {
      address: address,
    });
    return res.data;
  },

  register: async (
    address: string,
    signature: string,
    message: string,
    inviteCode: string
  ) => {
    const res = await instance.post(`${route}/signup-new`, {
      address: address,
      signature: signature,
      message: message,
      inviteCode: inviteCode,
    });
    return res.data;
  },

  uploadImageDirect: async (file: File) => {
    const uploadURL = await instance
      .post(`/generate-upload-url`)
      .then((res) => res.data.data.uploadURL);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(uploadURL, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!data.success) throw new Error("Upload failed");

    return data.result.variants[0];
  },

  async updateUser(username: string, avatar: string) {
    const res = await instance.post(`${route}/update`, {
      username: username,
      avatar: avatar,
    });

    return res.data;
  },

  async disconnectSocial(typeSocial: string) {
    const res = await instance.post(`/disconnect-social`, {
      typeSocial: typeSocial,
    });

    return res.data;
  },
};
