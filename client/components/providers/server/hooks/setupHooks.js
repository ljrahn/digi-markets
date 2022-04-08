import { handler as createContractSearch } from "./useContractSearch.js";
import { handler as createAccountNFT } from "./useAccountNFT.js";
import { handler as createAccountNFTTranfers } from "./useAccountNFTTranfers.js";
import { handler as createTokenList } from "./useTokenList.js";
import { handler as createToken } from "./useToken.js";
import { handler as createTokenTransfers } from "./useTokenTransfers.js";
import { handler as createEthPriceHook } from "./useEthPrice.js";
import { handler as createNetworkData } from "./useNetworkData.js";
import { useNetwork } from "@components/hooks/web3/index.js";

export const setupHooks = () => {
  return {
    useContractSearch: createContractSearch(),
    useNetworkData: createNetworkData(),
    useAccountNFT: createAccountNFT(),
    useAccountNFTTransfers: createAccountNFTTranfers(),
    useTokenList: createTokenList(),
    useToken: createToken(),
    useTokenTransfers: createTokenTransfers(),
    useEthPrice: createEthPriceHook(),
  };
};
