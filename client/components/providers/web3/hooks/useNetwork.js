import { useEffect } from "react";
import { useState } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

const SERVER_BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export const handler = (web3, provider) => () => {
  const { data, mutate, ...rest } = useSWR(
    () => (web3 ? "web3/network" : null),
    async () => {
      const chainId = await web3.eth.getChainId();

      if (!chainId) {
        throw new Error("Cannot retrieve network, Please refresh the browser");
      }

      return chainId;
    }
  );

  const networkFetcher = async (chainId) => {
    const res = await fetch(`${SERVER_BASE_URL}/api/network/${chainId}`);
    if (!res.ok) {
      const error = new Error(
        `Error occured while searching from the Server Network API: ${res.status}`
      );
      error.info = await res.json();
      error.status = res.status;
      throw error;
    }
    const networkData = await res.json();
    return networkData;
  };

  useEffect(async () => {
    const mutator = (chainId) => mutate(parseInt(chainId, 16));
    provider?.on("chainChanged", mutator);

    return () => {
      provider?.removeListener("chainChanged", mutator);
    };
  }, [provider]);

  return {
    data,
    mutate,
    networkFetcher,
    ...rest,
  };
};
