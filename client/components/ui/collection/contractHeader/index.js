import React from "react";
import { useState } from "react";
import { MdVerified } from "react-icons/md";
import { TiClipboard } from "react-icons/ti";
import ReactTooltip from "react-tooltip";

const ContractHeaderCard = ({ metadata, total }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="bg-gray-700 mx-auto p-2 sm:p-4 sm:h-64 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5">
      {loaded && metadata.image ? null : !metadata.image ? null : (
        <div className="h-44 w-44 xs:h-52 xs:w-52 mx-auto sm:h-full sm:w-56 rounded-full bg-gray-400 animate-pulse" />
      )}
      {metadata.image && (
        <div
          className={`h-44 w-44 xs:h-52 xs:w-52 mx-auto sm:h-full sm:w-56 rounded-full ${
            !loaded && "hidden"
          }`}
        >
          <img
            src={metadata.image}
            width="100%"
            onLoad={() => setLoaded(true)}
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-5 sm:p-2">
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex justify-center ml-2 items-center text-2xl text-gray-100">
            <div className="text-ellipsis overflow-hidden">{metadata.name}</div>
            {metadata.verified && (
              <div className="ml-2">
                <MdVerified size={21} color="rgb(81 164 247)" />
              </div>
            )}
          </div>
          <div className="text-center -mb-2 text-ellipsis overflow-hidden text-sm text-gray-300 underline underline-offset-2 border-slate-600">
            Address
          </div>
          <div
            data-tip="Copied to Clipboard"
            data-for="copyClipboard"
            className="flex justify-center items-center cursor-pointer"
          >
            <div className="text-center break-all text-sm text-gray-100 mr-1">
              {metadata.contract_address}
            </div>

            <TiClipboard color="white" size={20} />
          </div>

          <ReactTooltip
            event="click"
            eventOff="click"
            delayHide={1500}
            afterShow={() =>
              navigator.clipboard.writeText(metadata.contract_address)
            }
            effect="solid"
            place="bottom"
            id="copyClipboard"
          />

          <div className="text-center -mb-2 text-ellipsis overflow-hidden text-sm text-gray-300 underline underline-offset-2 border-slate-600">
            Blockchain
          </div>
          <div className="text-center break-words text-sm text-gray-100">
            {metadata.network.name}
          </div>
        </div>
        <div className="mt-auto flex">
          <div className="text-gray-100 text-md overflow-hidden text-ellipsis">
            {metadata.symbol}:
          </div>
          <div className="text-gray-100 text-md">{metadata.contract_type}</div>
          <div className="text-gray-100 text-md ml-auto">
            {total.toLocaleString()} Tokens
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractHeaderCard;
