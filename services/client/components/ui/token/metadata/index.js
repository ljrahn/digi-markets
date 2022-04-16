import { Accordian, CopyClipboard, RedirectUrl } from "@components/ui/common";
import NFTMetaDataParser from "@utils/nftMetaDataParser";
import React from "react";
import { useEffect, useState } from "react";
import TokenMetadataSkeleton from "./skeleton";

const isValidHttpUrl = (string) => {
  try {
    new URL(string);
  } catch (_) {
    return false;
  }
  return true;
};

const TokenMetadata = ({ tokenData, isTokenValidating }) => {
  const [parsedMetadata, setParsedMetadata] = useState(null);

  useEffect(() => {
    const func = async () => {
      if (!isTokenValidating && tokenData) {
        try {
          setParsedMetadata(null);
          const nftMetaDataParser = new NFTMetaDataParser(tokenData);
          setParsedMetadata(await nftMetaDataParser.getSortedMetadata());
        } catch (err) {
          console.error(err);
        }
      }
    };

    func();
  }, [isTokenValidating, tokenData]);

  return (
    <>
      {!isTokenValidating && tokenData ? (
        <div className="bg-gray-700 mx-auto p-4 font-mono rounded-2xl shadow-2xl flex flex-col border-4 border-indigo-800">
          <div className="flex flex-col gap-3 sm:p-2 text-center">
            <div className="mx-auto text-3xl text-white text-ellipsis overflow-hidden">
              {tokenData.name}
            </div>

            <div className="flex justify-center text-gray-300 text-2xl items-center">
              <div className="">{tokenData.symbol}</div>
              <div className="text-xl ml-2 overflow-hidden text-ellipsis">
                #{tokenData.token_id}
              </div>
            </div>
            <div className="-mb-2 text-ellipsis overflow-hidden text-sm text-gray-300 underline underline-offset-2">
              Contract
            </div>
            <RedirectUrl
              href={`/nft/contract/${tokenData.contract_address}?page=1`}
              className="text-gray-100"
              iconSize={17}
              internal={true}
            >
              <div className="break-all text-sm mr-1">
                {tokenData.contract_address}
              </div>
            </RedirectUrl>

            <div className="-mb-2 text-ellipsis overflow-hidden text-sm text-gray-300 underline underline-offset-2">
              Owner
            </div>
            <CopyClipboard copyText={tokenData.owner_of}>
              <div className="break-all text-sm text-gray-100 mr-1">
                {tokenData.owner_of}
              </div>
            </CopyClipboard>
            <div className="-mb-2 text-ellipsis overflow-hidden text-sm text-gray-300 underline underline-offset-2">
              Token URI
            </div>
            {isValidHttpUrl(tokenData.token_uri) ? (
              <RedirectUrl
                href={tokenData.token_uri}
                className="text-gray-100"
                iconSize={17}
              >
                <div className="break-all text-sm mr-1">
                  {tokenData.token_uri}
                </div>
              </RedirectUrl>
            ) : (
              <CopyClipboard copyText={tokenData.token_uri}>
                <div className="break-all text-sm text-gray-100 mr-1">
                  {tokenData.token_uri}
                </div>
              </CopyClipboard>
            )}

            <div className="-mb-2 text-ellipsis overflow-hidden text-sm text-gray-300 underline underline-offset-2">
              Contract Type
            </div>
            <div className="text-gray-100 text-sm">
              {tokenData.contract_type}
            </div>
          </div>
          <div className="mt-2">
            <Accordian data={parsedMetadata} />
          </div>
        </div>
      ) : (
        <TokenMetadataSkeleton />
      )}
    </>
  );
};

export default TokenMetadata;
