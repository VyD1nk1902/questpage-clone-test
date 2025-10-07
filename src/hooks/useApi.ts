import useSWR from "swr";

export function useApi<T = any>(
  fetcher?: (() => Promise<T>) | null,
  key?: string
) {
  const { data, error, isLoading, mutate } = useSWR<T>(
    fetcher ? key || fetcher.name : null, // nếu fetcher = null => không gọi API
    fetcher ? () => fetcher() : null
  );

  return { data, error, isLoading, mutate };
}
