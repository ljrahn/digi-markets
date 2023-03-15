import { useNetworkData } from "@components/hooks/server";
import { Message, Pagination } from "@components/ui/common";
import React from "react";
import TokenTransfersSkeleton from "./skeleton";
import TokenTransferItem from "./tokenTransferItem";

const TokenTransfers = ({
  tokenTransferData,
  tokenTransferIsValidating,
  tokenTransferError,
  cursors,
  setCursors,
  setPage,
}) => {
  const { networkData, isLoading: networkIsLoading } = useNetworkData();

  return (
    <>
      {!tokenTransferError ? (
        <>
          {!tokenTransferIsValidating &&
          !networkIsLoading &&
          tokenTransferData &&
          networkData ? (
            <div className="bg-gray-700 mx-auto p-2 sm:p-4 rounded-2xl shadow-lg flex flex-col">
              <div className="flex flex-col items-center flex-1 gap-5 sm:p-2">
                <div className="text-3xl text-gray-300 font-mono">
                  Token Transfers
                </div>
                <div className="relative shadow-md rounded-lg w-full md:overflow-x-auto overflow-x-scroll">
                  <table className="w-full text-sm text-left text-gray-400 table-fixed">
                    <thead className="text-sm uppercase  bg-gray-900 text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-6 text-center">
                          TX Hash
                        </th>
                        <th scope="col" className="px-6 py-6 text-center">
                          From
                        </th>
                        <th scope="col" className="px-6 py-6 text-center">
                          To
                        </th>
                        <th scope="col" className="px-3 py-6 text-center">
                          Value
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-6 text-center hidden sm:table-cell"
                        >
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tokenTransferData.result.map((item, index) => (
                        <TokenTransferItem
                          key={index}
                          item={item}
                          networkData={networkData}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>

                <Pagination
                  data={tokenTransferData}
                  cursors={cursors}
                  setCursors={setCursors}
                  setPage={setPage}
                  color="white"
                />
              </div>
            </div>
          ) : (
            <TokenTransfersSkeleton />
          )}
        </>
      ) : (
        <div className="mt-5 text-lg">
          <Message type="warning">
            There was a problem loading the requested NFT Token Transfers
          </Message>
        </div>
      )}
    </>
  );
};

export default TokenTransfers;
