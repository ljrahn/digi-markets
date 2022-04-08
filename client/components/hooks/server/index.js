import { useHooks } from "@components/providers/server";

export const useContractSearch = ({ text = "", page = 1, pageSize = 20 }) => {
  const response = useHooks((hooks) => hooks.useContractSearch)({
    text,
    page,
    pageSize,
  });
  return response;
};

export const useAccountNFT = ({ accountAddress, page = 1, pageSize = 20 }) => {
  const response = useHooks((hooks) => hooks.useAccountNFT)({
    accountAddress,
    page,
    pageSize,
  });
  return response;
};

export const useAccountNFTTransfers = ({
  accountAddress,
  page = 1,
  pageSize = 20,
}) => {
  const response = useHooks((hooks) => hooks.useAccountNFTTransfers)({
    accountAddress,
    page,
    pageSize,
  });
  return response;
};

export const useTokenList = ({ contractAddress, page = 1, pageSize = 12 }) => {
  const response = useHooks((hooks) => hooks.useTokenList)({
    contractAddress,
    page,
    pageSize,
  });
  return response;
};

export const useToken = ({
  contractAddress,
  tokenId,
  page = 1,
  pageSize = 20,
}) => {
  const response = useHooks((hooks) => hooks.useToken)({
    contractAddress,
    tokenId,
    page,
    pageSize,
  });
  return response;
};

export const useTokenTransfers = ({
  contractAddress,
  tokenId,
  page = 1,
  pageSize = 6,
}) => {
  const response = useHooks((hooks) => hooks.useTokenTransfers)({
    contractAddress,
    tokenId,
    page,
    pageSize,
  });
  return response;
};

export const useNetworkData = () => {
  const response = useHooks((hooks) => hooks.useNetworkData)();
  return response;
};

export const useEthPrice = () => {
  const response = useHooks((hooks) => hooks.useEthPrice)();
  return response;
};
