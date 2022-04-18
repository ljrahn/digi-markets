import { useContractMetadata, useTokenList } from "@components/hooks/server";
import { CopyClipboard, Message } from "@components/ui/common";
import { useRouter } from "next/router";
import React from "react";
import { useState, useEffect } from "react";
import { MdVerified } from "react-icons/md";
import SearchToken from "../searchToken";
import ContractHeaderSkeleton from "./contractHeaderSkeleton";

const ContractHeaderCard = ({
  contractMetadata,
  contractMetadataIsValidating,
  contractMetadataError,
}) => {
  const router = useRouter();
  const { contract, page } = router.query;
  const [loaded, setLoaded] = useState(false);
  const [totalTokens, setTotalTokens] = useState(null);
  const [contractState, setContractState] = useState(null);

  const {
    data: tokenListData,
    isValidating: tokenListIsValidating,
    error: tokenListError,
  } = useTokenList({
    contractAddress: contract,
    page: page,
  });

  useEffect(() => {
    if (tokenListData) {
      setTotalTokens(tokenListData.total);
      if (contract != contractState) {
        setContractState(contract);
      }
    }
  }, [contract, tokenListData]);

  return (
    <>
      {!contractMetadataError ? (
        <>
          {totalTokens && !contractMetadataIsValidating && contractMetadata ? (
            <div className="bg-gray-700 border-4 border-indigo-800 font-mono mx-auto p-6 sm:h-72 rounded-2xl shadow-2xl flex flex-col sm:flex-row gap-5">
              {loaded &&
              contractMetadata.image ? null : !contractMetadata.image ? null : (
                <div className="h-44 w-44 xs:h-52 xs:w-52 mx-auto sm:h-full sm:w-56 rounded-full bg-gray-400 animate-pulse" />
              )}
              {contractMetadata.image && (
                <div
                  className={`h-44 w-44 xs:h-52 xs:w-52 mx-auto sm:h-full sm:w-56 rounded-full ${
                    !loaded && "hidden"
                  }`}
                >
                  <img
                    alt="Contract Image"
                    src={contractMetadata.image}
                    width="100%"
                    onLoad={() => setLoaded(true)}
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col gap-5 sm:p-2">
                <div className="flex flex-1 flex-col gap-3">
                  <div className="flex justify-center ml-2 items-center text-2xl text-gray-100">
                    <div className="text-ellipsis overflow-hidden">
                      {contractMetadata.name}
                    </div>
                    {contractMetadata.verified && (
                      <div className="ml-2">
                        <MdVerified size={21} color="rgb(81 164 247)" />
                      </div>
                    )}
                  </div>
                  <div className="text-center -mb-2 text-ellipsis overflow-hidden text-sm text-gray-300 underline underline-offset-2 border-slate-600">
                    Address
                  </div>
                  <CopyClipboard copyText={contractMetadata.contract_address}>
                    <div className="text-center break-all text-sm text-gray-100 mr-1">
                      {contractMetadata.contract_address}
                    </div>
                  </CopyClipboard>

                  <div className="text-center -mb-2 text-ellipsis overflow-hidden text-sm text-gray-300 underline underline-offset-2 border-slate-600">
                    Blockchain
                  </div>
                  <div className="text-center break-words text-sm text-gray-100">
                    {contractMetadata.network.name}
                  </div>
                </div>

                <div className="mt-auto flex">
                  <div className="text-gray-100 text-md overflow-hidden text-ellipsis">
                    {contractMetadata.symbol}:
                  </div>
                  <div className="text-gray-100 text-md">
                    {contractMetadata.contract_type}
                  </div>
                  {!tokenListIsValidating &&
                    !tokenListError &&
                    tokenListData && (
                      <div className="text-gray-100 text-md ml-auto">
                        {totalTokens.toLocaleString()} Tokens
                      </div>
                    )}
                </div>
                <div className="w-52 ml-auto relative">
                  <div className="absolute -top-4 -right-1">
                    <SearchToken contractAddress={contract} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <ContractHeaderSkeleton />
          )}
        </>
      ) : (
        <div className="mt-5 text-lg">
          <Message type="warning">
            There was a problem loading contract metadata
          </Message>
        </div>
      )}
    </>
  );
};

export default ContractHeaderCard;
