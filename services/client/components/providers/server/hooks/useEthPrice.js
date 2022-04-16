import { useNetworkData } from "@components/hooks/server";
import { useNetwork } from "@components/hooks/web3";
import { useState, useEffect } from "react";
import useSWR from "swr";

const ETH_URL =
  "https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false";
const MATIC_URL =
  "https://api.coingecko.com/api/v3/coins/matic-network?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false";

const fetcher = async (url) => {
  const res = await fetch(url);
  const json = await res.json();
  return json.market_data.current_price.usd ?? null;
};

export const handler = () => () => {
  const {
    networkData,
    isLoading: networkIsLoading,
    error: networkError,
  } = useNetworkData();

  const { data, ...rest } = useSWR(
    !networkIsLoading && !networkError && networkData
      ? networkData.currency == "MATIC"
        ? MATIC_URL
        : ETH_URL
      : null,
    fetcher,
    { refreshInterval: 10000 }
  );

  return {
    data,
    ...rest,
  };
};
