import { useToken, useTokenTransfers } from "@components/hooks/server";
import { BaseLayout } from "@components/ui/layout";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import {
  TokenImage,
  TokenImageSkeleton,
  TokenMetadata,
  TokenMetadataSkeleton,
  TokenTransfers,
  TokenTransfersSkeleton,
} from "@components/ui/token";
import { BackButton } from "@components/ui/common";

export default function NFTToken() {
  const router = useRouter();
  const { contract, page, token } = router.query;
  const {
    data: tokenData,
    isLoading: isTokenLoading,
    error: tokenError,
  } = useToken({ contractAddress: contract, tokenId: token, page: page });
  const {
    data: tokenTransferData,
    isLoading: isTokenTransferLoading,
    error: tokenTransferError,
  } = useTokenTransfers({
    contractAddress: contract,
    tokenId: token,
    page: page,
  });

  useEffect(() => {
    // console.log(tokenData);
    // console.log(tokenTransferData);
  }, [tokenData, tokenTransferData, isTokenLoading, isTokenTransferLoading]);

  return (
    <>
      <BackButton />
      <div className="mb-8 mt-2">
        {!tokenError && !tokenTransferError ? (
          <>
            <div className="flex justify-center items-center flex-col-reverse lg:flex-row">
              {!isTokenLoading && tokenData ? (
                <>
                  <div className="flex-initial w-full md:w-4/5 lg:w-5/12">
                    <TokenImage tokenData={tokenData} />
                  </div>
                  <div className="flex-1 w-full ml-0 lg:ml-5 mb-5">
                    <TokenMetadata tokenData={tokenData} />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex-initial w-full md:w-4/5 lg:w-5/12">
                    <TokenImageSkeleton />
                  </div>
                  <div className="flex-1 w-full ml-0 lg:ml-5 mb-5">
                    <TokenMetadataSkeleton />
                  </div>
                </>
              )}
            </div>
            {!isTokenTransferLoading && tokenTransferData ? (
              <div className="mt-10 w-full md:w-2/3 mx-auto">
                <TokenTransfers />
              </div>
            ) : (
              <div className="mt-10 w-full md:w-2/3 mx-auto">
                <TokenTransfersSkeleton />
              </div>
            )}
          </>
        ) : (
          <div className="text-center mt-28 text-2xl font-extrabold text-gray-600">
            There was a problem loading the requested NFT Token
          </div>
        )}
      </div>
    </>
  );
}

NFTToken.Layout = BaseLayout;
