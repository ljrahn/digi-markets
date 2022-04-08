import { useNetwork } from "@components/hooks/web3";
import React from "react";
import { useState, useEffect } from "react";

export const handler = () => () => {
  const { network } = useNetwork();
  const [networkData, setNetworkData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(
    network.error ? "There was a Metamask Network Error" : null
  );

  useEffect(async () => {
    if (network.data) {
      setIsLoading(true);
      try {
        setNetworkData(await network.networkFetcher(network.data));
        setError(null);
      } catch (err) {
        console.error(err.info);
        setNetworkData(null);
        setError("There was a Metamask Network Error");
      }
      setIsLoading(false);
    }
  }, [network.data]);

  return { networkData, isLoading, error };
};
