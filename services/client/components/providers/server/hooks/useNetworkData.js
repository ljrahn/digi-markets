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

  network.useNetworkFetcher(network.data).then((res) => {
    if (res) {
      if (res.data) {
        setNetworkData(res.data);
        setError(null);
      }
      if (res.error) {
        setError(res.error.message);
        setNetworkData(null);
      }
      setIsLoading(false);
    }
  });

  return { networkData, isLoading, error };
};
