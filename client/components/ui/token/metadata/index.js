import { Accordian } from "@components/ui/common";
import NFTMetaDataParser from "@utils/nftMetaDataParser";
import React from "react";
import { TiClipboard } from "react-icons/ti";
import ReactTooltip from "react-tooltip";
import { useEffect, useState } from "react";

const TokenMetadata = ({ tokenData }) => {
  const [parsedMetadata, setParsedMetadata] = useState(null);
  const nftMetaDataParser = new NFTMetaDataParser(tokenData);

  useEffect(async () => {
    try {
      setParsedMetadata(await nftMetaDataParser.getSortedMetadata());
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className="bg-gray-700 mx-auto p-2 sm:p-4 rounded-2xl shadow-lg flex flex-col select-none">
      <div className="flex flex-col flex-1 gap-3 sm:p-2">
        <div className="mx-auto text-3xl text-white text-ellipsis overflow-hidden">
          {tokenData.name}
        </div>
        <div className="flex justify-center text-gray-300 text-2xl items-center">
          <div>{tokenData.symbol}</div>
          <div className="text-xl ml-2">#{tokenData.token_id}</div>
        </div>
        <div className="text-center -mb-2 text-ellipsis overflow-hidden text-sm text-gray-300 underline underline-offset-2">
          Owner
        </div>
        <div
          data-tip="Copied to Clipboard"
          data-for="copyClipboardOwner"
          className="flex justify-center items-center cursor-pointer"
        >
          <div className="text-center break-all text-sm text-gray-100 mr-1">
            {tokenData.owner_of}
          </div>

          <TiClipboard color="white" size={20} />
        </div>

        <ReactTooltip
          event="click"
          eventOff="click"
          delayHide={1500}
          afterShow={() => navigator.clipboard.writeText(tokenData.owner_of)}
          effect="solid"
          place="bottom"
          id="copyClipboardOwner"
        />
        <div className="text-center -mb-2 text-ellipsis overflow-hidden text-sm text-gray-300 underline underline-offset-2">
          Token URI
        </div>
        <div
          data-tip="Copied to Clipboard"
          data-for="copyClipboardTokenUri"
          className="flex justify-center items-center cursor-pointer"
        >
          <div className="text-center break-all text-sm text-gray-100 mr-1">
            {tokenData.token_uri}
          </div>

          <TiClipboard color="white" size={20} />
        </div>

        <ReactTooltip
          event="click"
          eventOff="click"
          delayHide={1500}
          afterShow={() => navigator.clipboard.writeText(tokenData.token_uri)}
          effect="solid"
          place="bottom"
          id="copyClipboardTokenUri"
        />
        <div className="text-center -mb-2 text-ellipsis overflow-hidden text-sm text-gray-300 underline underline-offset-2">
          Contract Type
        </div>
        <div className="text-center text-gray-100 text-sm">
          {tokenData.contract_type}
        </div>
      </div>
      <div className="mt-2">
        <Accordian data={parsedMetadata} />
      </div>
    </div>
  );
};

export default TokenMetadata;
