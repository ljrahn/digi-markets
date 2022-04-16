import { useNetworkData } from "@components/hooks/server";
import useSWRImmutable from "swr/immutable";

const SERVER_BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

const serverFetcher = async ({ text, chain, page, pageSize }) => {
  const res = await fetch(
    `${SERVER_BASE_URL}/api/nft/contract/search?q=${text}&filter=name,symbol&chain=${chain}&page=${page}&page_size=${pageSize}`
  );

  if (!res.ok) {
    const error = new Error(
      `Error occured while querying the Server API: ${res.status}`
    );
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return await res.json();
};

export const handler =
  () =>
  ({ text, page, pageSize }) => {
    const {
      networkData,
      isLoading: networkIsLoading,
      error: networkError,
    } = useNetworkData();

    const chain = networkData ? networkData.short_name : "eth";
    const url = `${SERVER_BASE_URL}/api/nft/contract/search?q=${text}&filter=name,symbol&chain=${chain}&page=${page}&page_size=${pageSize}`;

    const { data, ...rest } = useSWRImmutable(
      page && networkData && !networkIsLoading && (text || text == "")
        ? url
        : null,
      async () => {
        const res = await fetch(url);
        if (!res.ok) {
          const error = new Error(
            `Error occured while querying the Server Contract Search API: ${res.status}`
          );
          error.info = await res.json();
          error.status = res.status;
          throw error;
        }
        return await res.json();
      }
    );

    return { data, ...rest };
  };
