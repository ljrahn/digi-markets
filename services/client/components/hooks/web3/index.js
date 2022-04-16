import { useHooks } from "@components/providers/web3";
import { useEffect } from "react";
import { useWeb3 } from "@components/providers";
import { useRouter } from "next/router";
import { useCallback } from "react";

const _isEmpty = (data) =>
  data == null ||
  data == "" ||
  (Array.isArray(data) && data.length === 0) ||
  (Object.keys(data).length === 0 && data.constructor === Object);

const enhanceHook = (swrRes) => {
  const { data, error } = swrRes;
  const hasInitialResponse = !!(data || error);
  const isEmpty = hasInitialResponse && _isEmpty(data);

  return {
    ...swrRes,
    hasInitialResponse,
    isEmpty,
  };
};

export const useNetwork = () => {
  const response = useHooks((hooks) => hooks.useNetwork)();
  return {
    network: response,
  };
};

export const useAccount = () => {
  const swrRes = enhanceHook(useHooks((hooks) => hooks.useAccount)());
  return {
    account: swrRes,
  };
};

export const useWalletInfo = () => {
  const { account } = useAccount();
  const { network } = useNetwork();

  return {
    account,
    network,
    canPurchaseCourse: !!(account.data && network.isSupported),
  };
};
