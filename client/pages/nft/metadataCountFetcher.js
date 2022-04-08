import { useNetworkData } from "@components/hooks/server";
import React from "react";
import { useState, useEffect } from "react";

const SERVER_BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

const metadataCountFetcher = async ({ contractAddress, chain }) => {
  const res = await fetch(
    `${SERVER_BASE_URL}/api/nft/contract/${contractAddress}/count?&chain=${chain}`,
    {
      method: "POST",
    }
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

const MetadataCountFetcher = (contract) => {
  const {
    networkData,
    isLoading: networkIsLoading,
    error: networkError,
  } = useNetworkData();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(networkError ? networkError : null);

  useEffect(async () => {
    if (!networkIsLoading && !networkError && networkData && contract) {
      setIsLoading(true);
      try {
        const response = await metadataCountFetcher({
          contractAddress: contract,
          chain: networkData.short_name,
        });
        setData(response);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("There was an error querying contract data");
        setData(null);
      }
      setIsLoading(false);
    }
  }, [networkData, contract, networkIsLoading, networkError]);

  return { data, isLoading, error };
};

export default MetadataCountFetcher;
