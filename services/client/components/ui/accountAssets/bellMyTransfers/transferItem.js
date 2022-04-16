import { useContractMetadata, useNetworkData } from "@components/hooks/server";
import { useWeb3 } from "@components/providers";
import { Loader } from "@components/ui/common";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import { BiLinkExternal } from "react-icons/bi";
import { RiUserReceived2Fill, RiSendPlaneFill } from "react-icons/ri";

const TransferItem = ({ item, accountData }) => {
  const { web3 } = useWeb3();
  const [value, setValue] = useState(0);

  const {
    networkData,
    isLoading: networkIsLoading,
    error: networkError,
  } = useNetworkData();
  const {
    data: contractMetadata,
    isValidating: contractMetadataIsValidating,
    error: contractMetadataError,
  } = useContractMetadata({ contractAddress: item.contract_address });

  useEffect(() => {
    if (item.value) {
      setValue(web3.utils.fromWei(String(item.value), "ether").toString());
    }
  }, []);

  return (
    <div>
      <>
        {!contractMetadataError && !networkError ? (
          <>
            {!contractMetadataIsValidating &&
            !networkIsLoading &&
            contractMetadata ? (
              <div className="flex justify-center items-center">
                <div className="flex-none mr-auto">
                  {item.to_address == accountData ? (
                    <RiUserReceived2Fill size={20} />
                  ) : (
                    <RiSendPlaneFill size={20} />
                  )}
                </div>

                <div className="text-center overflow-hidden text-ellipsis flex items-center">
                  {contractMetadata.name}
                  <div className="text-xs ml-1 overflow-hidden text-ellipsis">
                    #{item.token_id}
                  </div>
                </div>

                <div className="bg-gray-500 text-white text-xs px-2 py-1 rounded-lg w-fit ml-2 mr-auto overflow-hidden text-ellipsis">
                  {value} {networkData.currency}
                </div>
                <BiLinkExternal size={20} className="flex-none" />
              </div>
            ) : (
              <div className="flex justify-center">
                <Loader color="white" />
              </div>
            )}
          </>
        ) : (
          <div className="flex justify-center items-center text-xs text-center text-gray-300">
            <Image
              src="/no_items.png"
              width={25}
              height={25}
              className="flex-none"
            />
            <span className="ml-2">There was an Error</span>
          </div>
        )}
      </>
    </div>
  );
};

export default TransferItem;
