import { useNetworkData } from "@components/hooks/server";
import { CopyClipboard } from "@components/ui/common";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { MdVerified } from "react-icons/md";
import Button from "../button";

const PopularCollectionsItem = ({ contractData }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="bg-gray-700 border-4 w-full h-full border-gray-900 font-mono mx-auto p-6 rounded-2xl shadow-2xl flex flex-col">
      {loaded && contractData.image ? null : !contractData.image ? null : (
        <div className="h-44 w-44 mx-auto rounded-full bg-gray-400 animate-pulse flex-shrink" />
      )}

      {contractData.image && (
        <div
          className={`mx-auto h-44 w-44 rounded-full ${!loaded && "hidden"}`}
        >
          <img
            alt="Contract Image"
            src={contractData.image}
            width="100%"
            className="rounded-full"
            onLoad={() => setLoaded(true)}
          />
        </div>
      )}

      <div className="flex flex-1 flex-col justify-center gap-2 sm:p-2">
        <div className="flex justify-center ml-2 items-center text-2xl text-gray-100">
          <div className="text-ellipsis overflow-hidden">
            {contractData.name}
          </div>
          {contractData.verified && (
            <div className="ml-2">
              <MdVerified size={21} color="rgb(81 164 247)" />
            </div>
          )}
        </div>
        <div className="mx-auto text-gray-400">{contractData.symbol}</div>
        <div className="text-center -mb-2 text-ellipsis overflow-hidden text-sm text-gray-300 underline underline-offset-2 border-slate-600">
          Address
        </div>
        <CopyClipboard copyText={contractData.contract_address}>
          <div className="text-center break-all text-sm text-gray-100 mr-1">
            {contractData.contract_address}
          </div>
        </CopyClipboard>
        <div className="flex justify-center items-center gap-4">
          <div>
            <div className="text-center text-ellipsis overflow-hidden text-sm text-gray-300 underline underline-offset-2 border-slate-600">
              Blockchain
            </div>
            <div className="text-center break-words text-sm text-gray-100">
              {contractData.network.name}
            </div>
          </div>
          <div>
            <div className="text-center text-ellipsis overflow-hidden text-sm text-gray-300 underline underline-offset-2 border-slate-600">
              Contract Type
            </div>
            <div className="text-center break-words text-sm text-gray-100">
              {contractData.contract_type}
            </div>
          </div>
        </div>
        <Link href={`/nft/contract/${contractData.contract_address}?page=1`}>
          <a className="mx-auto mt-4">
            <Button variant="blue">View Collection</Button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PopularCollectionsItem;
