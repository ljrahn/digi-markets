import { useNetworkData } from "@components/hooks/server";
import { useNetwork } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import React from "react";
import { useEffect, useState } from "react";

const NetworkConnection = () => {
  const { requireInstall } = useWeb3();
  const { networkData, error } = useNetworkData();

  return (
    <div className="mt-5 text-black">
      {networkData && (
        <div
          className={`${
            networkData.supported ? "bg-green-400" : "bg-red-400"
          } px-4 rounded-lg text-center font-medium divide-y-2 divide-black`}
        >
          {!networkData.supported && (
            <>
              <div className="font-extrabold py-3">
                Connected to wrong network
              </div>
              <div className="py-3">
                <strong>Connect to a supported network!</strong>
              </div>
            </>
          )}

          <div className="py-3">
            Currently on: {` `}
            <strong className="text-lg">{networkData.name}</strong>
          </div>
        </div>
      )}
      {requireInstall && (
        <div className="bg-yellow-500 p-4 rounded-lg">
          Cannot connect to network. Please install Metamask
        </div>
      )}
      {error && (
        <div className="bg-red-400 p-4 rounded-lg">{String(error)}</div>
      )}
    </div>
  );
};

export default NetworkConnection;
