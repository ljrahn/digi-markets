import { useNetworkData } from "@components/hooks/server";
import { useNetwork } from "@components/hooks/web3";
import { useEffect, useState } from "react";

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
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(networkError ? networkError : null);

    useEffect(async () => {
      if (text && !networkIsLoading) {
        setIsLoading(true);
        try {
          const response = await serverFetcher({
            text,
            chain: networkData ? networkData.short_name : "eth",
            page,
            pageSize,
          });
          setData(response);
          setError(null);
        } catch (err) {
          console.error(err);
          setError("There was an contract search error");
          setData(null);
        }
        setIsLoading(false);
      }
    }, [text, page, networkData]);

    return { data, isLoading, error };
  };
