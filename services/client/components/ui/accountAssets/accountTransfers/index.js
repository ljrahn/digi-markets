import { useNetworkData, useTokenTransfers } from "@components/hooks/server";
import { useWeb3 } from "@components/providers";
import { CopyClipboard, Pagination } from "@components/ui/common";
import { useRouter } from "next/router";
import React from "react";
import { BiLinkExternal } from "react-icons/bi";
import AccountTokenTransfersSkeleton from "./skeleton";
import AccountTokenTransferItem from "./accountTokenTransferItem";
import { useState } from "react";

const AccountTokenTransfers = ({
  tokenTransferData,
  tokenTransferIsValidating,
  tokenTransferError,
}) => {
  const router = useRouter();
  const { contract, token, page } = router.query;
  const { networkData, isLoading: networkIsLoading } = useNetworkData();
  const [error, setError] = useState(null);

  const errorHandler = (error) => {
    if (error) {
      setError(true);
    } else {
      setError(false);
    }
  };
  return (
    <>
      {!tokenTransferError && !error ? (
        <>
          {!tokenTransferIsValidating &&
          !networkIsLoading &&
          tokenTransferData &&
          networkData ? (
            <div className="bg-gray-700 mx-auto p-2 sm:p-4 rounded-2xl shadow-lg flex flex-col">
              <div className="flex flex-col items-center flex-1 gap-5 sm:p-2">
                <div className="relative shadow-md rounded-lg w-full md:overflow-x-auto overflow-x-scroll">
                  <table className="w-full text-sm text-left text-gray-400 table-fixed">
                    <thead className="text-sm uppercase  bg-gray-900 text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-6 text-center">
                          NFT
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-6 text-center hidden sm:table-cell"
                        >
                          TX Hash
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-6 w-20 md:w-32 text-center"
                        >
                          Transfer/ Receive
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-6 w-20 md:w-32 text-center"
                        >
                          Value
                        </th>
                        <th scope="col" className="px-6 py-6 text-center">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tokenTransferData.result.map((item, index) => (
                        <AccountTokenTransferItem
                          key={index}
                          item={item}
                          networkData={networkData}
                          error={errorHandler}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>

                <Pagination
                  total={tokenTransferData.total}
                  page={tokenTransferData.page}
                  numResults={tokenTransferData.num_results}
                  pageSize={tokenTransferData.page_size}
                  scroll={false}
                  color="white"
                />
              </div>
            </div>
          ) : (
            <AccountTokenTransfersSkeleton />
          )}
        </>
      ) : (
        <div className="text-center text-2xl font-extrabold text-gray-600">
          There was a problem loading the requested NFT Token Transfers
        </div>
      )}
    </>
  );
};

export default AccountTokenTransfers;
