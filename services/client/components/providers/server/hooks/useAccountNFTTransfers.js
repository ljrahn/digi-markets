import { useNetworkData } from "@components/hooks/server";
import { useAccount } from "@components/hooks/web3";
import useSWRImmutable from "swr/immutable";

const SERVER_BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export const handler =
  () =>
  ({ accountAddress, page, pageSize }) => {
    const { account } = useAccount();
    const {
      networkData,
      isLoading: networkIsLoading,
      error: networkError,
    } = useNetworkData();

    const chain = networkData ? networkData.short_name : "eth";
    const url = `${SERVER_BASE_URL}/api/nft/eoa/${accountAddress}/transfers?chain=${chain}&page=${page}&page_size=${pageSize}`;

    const { data, ...rest } = useSWRImmutable(
      accountAddress && page && networkData && !networkIsLoading ? url : null,
      async () => {
        const res = await fetch(url);
        if (!res.ok) {
          const error = new Error(
            `Error occured while querying the Server Account Transfers API: ${res.status}`
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
