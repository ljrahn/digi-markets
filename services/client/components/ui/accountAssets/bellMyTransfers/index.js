import React from "react";
import { BellIcon } from "@heroicons/react/solid";
import { useState, useRef, useEffect } from "react";
import {
  useAccountNFTTransfers,
  useNetworkData,
} from "@components/hooks/server";
import TransferItem from "./transferItem";
import { Loader } from "@components/ui/common";
import { useAccount } from "@components/hooks/web3";
import Image from "next/image";
import Link from "next/link";

const BellMyTransfers = ({ onClick }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const bellRef = useRef();
  const { account } = useAccount();
  const accountData = account.data;
  const {
    networkData,
    isLoading: networkIsLoading,
    error: networkError,
  } = useNetworkData();
  const {
    data: transferData,
    isValidating: transferDataIsValidating,
    error: transferDataError,
  } = useAccountNFTTransfers({
    accountAddress: accountData,
  });

  const setFalse = (e) => {
    if (e.target.parentNode) {
      if (
        e.target.parentNode.parentNode != bellRef.current &&
        e.target.parentNode != bellRef.current
      ) {
        setShowDropdown(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", (e) => setFalse(e));
    return document.removeEventListener("click", (e) => setFalse(e));
  }, []);

  const bellClick = () => {
    setShowDropdown(!showDropdown);
    onClick();
  };

  return (
    <div className="relative">
      <button ref={bellRef} onClick={bellClick} className="">
        <BellIcon className="h-6 w-6 text-white" />
      </button>
      {showDropdown && (
        <div
          id="dropdownInformation"
          className="absolute xs:w-96 sm:w-120 md:w-140 lg:w-160 top-8 -right-4 rounded-lg shadow bg-gray-700"
        >
          <>
            {" "}
            {accountData ? (
              <>
                {!transferDataError ? (
                  <>
                    {!transferDataIsValidating && transferData ? (
                      <>
                        {transferData.total != 0 ? (
                          <>
                            <div className="text-center text-lg font-extrabold bg-gray-800 border-b border-gray-500 text-gray-400 py-3 px-8">
                              <div className="mx-auto">My NFT Transactions</div>
                            </div>
                            {transferData.result.map((item, index) => (
                              <a
                                key={index}
                                href={
                                  networkData &&
                                  !networkError &&
                                  !networkIsLoading
                                    ? `${networkData.block_explorer}/tx/${item.transaction_hash}`
                                    : "#"
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                <div
                                  className="text-center text-gray-300 py-4 px-8"
                                  style={{
                                    borderBottom: "1px solid gray",
                                  }}
                                >
                                  <TransferItem
                                    item={item}
                                    accountData={accountData}
                                  />
                                </div>
                              </a>
                            ))}
                            <div className="text-center py-3 px-8 bg-gray-800 rounded-b-lg">
                              <Link
                                href={`/nft/eoa/${accountData}/transfers?page=1`}
                              >
                                <a className="text-blue-500 text-center">
                                  View More
                                </a>
                              </Link>
                            </div>
                          </>
                        ) : (
                          <div className="flex justify-center items-center text-center text-gray-300 py-3 px-8">
                            <Image src="/no_items.png" width={30} height={30} />
                            <div className="ml-1">
                              This account has no NFT transfers
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex justify-center py-3 px-8">
                        <Loader color="white" />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex justify-center items-center text-center text-gray-300 py-3 px-8">
                    <Image src="/no_items.png" width={30} height={30} />
                    <span className="ml-1">
                      Error fetching account transfers
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="flex justify-center items-center text-center text-gray-300 py-3 px-8">
                <Image src="/no_items.png" width={30} height={30} />
                <span className="ml-1">No Account Connected</span>
              </div>
            )}
          </>
        </div>
      )}
    </div>
  );
};

export default BellMyTransfers;
