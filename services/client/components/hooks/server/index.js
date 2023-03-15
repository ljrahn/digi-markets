import { useHooks } from "@components/providers/server";

export const useContractSearch = ({ text = "", page = 1, pageSize = 20 }) => {
  const response = useHooks((hooks) => hooks.useContractSearch)({
    text,
    page,
    pageSize,
  });
  return response;
};

export const useAccountNFT = ({
  accountAddress,
  cursor = "",
  pageSize = 12,
}) => {
  const response = useHooks((hooks) => hooks.useAccountNFT)({
    accountAddress,
    cursor,
    pageSize,
  });
  return response;
};

export const useAccountNFTTransfers = ({
  accountAddress,
  cursor = "",
  pageSize = 6,
}) => {
  const response = useHooks((hooks) => hooks.useAccountNFTTransfers)({
    accountAddress,
    cursor,
    pageSize,
  });
  return response;
};

export const useTokenList = ({
  contractAddress,
  cursor = "",
  pageSize = 12,
}) => {
  const response = useHooks((hooks) => hooks.useTokenList)({
    contractAddress,
    cursor,
    pageSize,
  });
  return response;
};

export const useToken = ({
  contractAddress,
  tokenId,
  cursor = "",
  pageSize = 20,
}) => {
  const response = useHooks((hooks) => hooks.useToken)({
    contractAddress,
    tokenId,
    cursor,
    pageSize,
  });
  return response;
};

export const useTokenTransfers = ({
  contractAddress,
  tokenId,
  cursor = "",
  pageSize = 6,
}) => {
  const response = useHooks((hooks) => hooks.useTokenTransfers)({
    contractAddress,
    tokenId,
    cursor,
    pageSize,
  });
  return response;
};

export const useContractMetadata = ({ contractAddress }) => {
  const response = useHooks((hooks) => hooks.useContractMetadata)({
    contractAddress,
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
