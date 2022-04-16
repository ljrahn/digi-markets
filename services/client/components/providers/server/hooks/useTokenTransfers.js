import { useNetworkData } from "@components/hooks/server";
import useSWRImmutable from "swr/immutable";

const SERVER_BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export const handler =
  () =>
  ({ contractAddress, tokenId, page, pageSize }) => {
    const {
      networkData,
      isLoading: networkIsLoading,
      error: networkError,
    } = useNetworkData();

    const chain = networkData ? networkData.short_name : "eth";
    const url = `${SERVER_BASE_URL}/api/nft/contract/${contractAddress}/${tokenId}/transfers?chain=${chain}&page=${page}&page_size=${pageSize}`;

    const { data, ...rest } = useSWRImmutable(
      contractAddress && page && tokenId && networkData && !networkIsLoading
        ? url
        : null,
      async () => {
        const res = await fetch(url);
        const data = await res.json();
        if (!res.ok || data.total == 0) {
          const error = new Error(
            `Error occured while querying the Token Transfer Server API: ${res.status}`
          );
          error.info = data;
          error.status = res.status;
          throw error;
        }
        return data;
      }
    );

    return { data, ...rest };
  };
