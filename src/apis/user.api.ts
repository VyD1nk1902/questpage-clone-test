import instance from "./instance";

const route = "/user";

export const userApi = {
  getUserInfo: () => instance.get(`${route}/info`).then((res) => res.data),
};
