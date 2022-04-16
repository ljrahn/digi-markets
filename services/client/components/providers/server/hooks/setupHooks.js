import { handler as createContractSearch } from "./useContractSearch.js";
import { handler as createAccountNFT } from "./useAccountNFT.js";
import { handler as createAccountNFTTransfers } from "./useAccountNFTTransfers.js";
import { handler as createTokenList } from "./useTokenList.js";
import { handler as createToken } from "./useToken.js";
import { handler as createTokenTransfers } from "./useTokenTransfers.js";
import { handler as createEthPriceHook } from "./useEthPrice.js";
import { handler as createNetworkData } from "./useNetworkData.js";
import { handler as createContractMetadata } from "./useContractMetadata";

export const setupHooks = () => {
  return {
    useContractSearch: createContractSearch(),
    useNetworkData: createNetworkData(),
    useAccountNFT: createAccountNFT(),
    useAccountNFTTransfers: createAccountNFTTransfers(),
    useTokenList: createTokenList(),
    useToken: createToken(),
    useContractMetadata: createContractMetadata(),
    useTokenTransfers: createTokenTransfers(),
    useEthPrice: createEthPriceHook(),
    useEthPrice: createEthPriceHook(),
  };
};
