import { APP_STORAGE_KEY } from "@/constants/app-data.constant";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const apiConfig = {
  API: `${import.meta.env.VITE_API_URL}`,
};

const instance = axios.create({
  baseURL: apiConfig.API,
  headers: {
    Accept: "application/json",
  },
  timeout: 30000, // 30 seconds
});

const getUrl = (config: any) => {
  if (config?.baseURL) {
    return config?.url.replace(config?.baseURL, "");
  }
  return config?.url;
};

const getAPI = () => {
  return apiConfig.API;
};

// Intercept all request
instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    config.baseURL = getAPI();
    const rawState = window.localStorage.getItem("user-store");
    if (rawState) {
      const parsed = JSON.parse(rawState);
      const token = parsed.state?.token;
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept all responses
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
