import instance from "./instance";

const route = "/user";

export const userApi = {
  async getUserInfo() {
    const res = await instance.get(`${route}/info`);
    return res.data;
  },

  async createSignature(address: string) {
    const res = await instance.post(`${route}/create-signature`, {
      address: address,
    });
    return res.data;
  },

  async register(
    address: string,
    signature: string,
    message: string,
    inviteCode: string
  ) {
    const res = await instance.post(`${route}/signup-new`, {
      address: address,
      signature: signature,
      message: message,
      inviteCode: inviteCode,
    });
    return res.data;
  },
};
