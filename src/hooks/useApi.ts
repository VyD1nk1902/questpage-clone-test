import instance from "@/apis/instance";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string, method: string = "GET", data?: any) => {
  if (method == "POST") {
    return instance.post(url, data).then((response) => response.data);
  } else {
    return instance.get(url).then((response) => response.data);
  }
};

const useApi = (url: string | null, method?: string, data?: any) => {
  const swr = useSWR(url, () => fetcher(url as string, method, data), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    ...swr,
    mutate: (partialData?: any, shouldRevalidate: boolean = false) => {
      if (!partialData) return swr.mutate();

      return swr.mutate(
        (current: any) => {
          if (!current) return current;
          return {
            ...current,
            data: {
              ...current.data,
              ...partialData,
            },
          };
        },
        { revalidate: shouldRevalidate }
      );
    },
  };
};

export default useApi;
