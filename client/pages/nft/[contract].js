import { useNetworkData, useTokenList } from "@components/hooks/server";
import { BaseLayout } from "@components/ui/layout";
import { useRouter } from "next/router";
import {
  ContractHeaderCard,
  TokenCard,
  TokenSkeleton,
} from "@components/ui/collection";
import { ContractHeaderSkeleton } from "@components/ui/collection";
import { ActiveLink, Pagination } from "@components/ui/common";
import React from "react";
import { useEffect, useState } from "react";
import MetadataCountFetcher from "./metadataCountFetcher";

export default function NFTContract() {
  const router = useRouter();
  const { contract, page } = router.query;
  const {
    data: metadata,
    error: metadataError,
    isLoading: metadataIsLoading,
  } = MetadataCountFetcher(contract);
  const {
    data: tokenListData,
    error: tokenListError,
    isLoading: isTokenListLoading,
  } = useTokenList({
    contractAddress: contract,
    page: page,
  });

  useEffect(async () => {}, [contract, page]);

  return (
    <div className="my-8">
      {!metadataError && !tokenListError ? (
        <>
          <div className="mx-auto w-2/3 sm:w-full lg:w-2/3">
            {!metadataIsLoading &&
            !isTokenListLoading &&
            tokenListData &&
            metadata ? (
              <ContractHeaderCard
                metadata={metadata}
                total={tokenListData.total}
              />
            ) : (
              <ContractHeaderSkeleton />
            )}
          </div>
          <div className="mt-6 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {!isTokenListLoading && tokenListData
              ? tokenListData?.result.map((item, index) => (
                  <ActiveLink
                    key={index}
                    href={`/nft/${item.contract_address}/${item.token_id}`}
                  >
                    <a>
                      <TokenCard item={item} />
                    </a>
                  </ActiveLink>
                ))
              : Array(12)
                  .fill(0)
                  .map((_, index) => <TokenSkeleton key={index} />)}
          </div>
          {!metadataIsLoading && !isTokenListLoading && tokenListData && (
            <div className="mt-10">
              <Pagination
                total={tokenListData.total}
                numResults={tokenListData.num_results}
                page={tokenListData.page}
                pageSize={tokenListData.page_size}
              />
            </div>
          )}
        </>
      ) : (
        <div className="text-center mt-28 text-2xl font-extrabold text-gray-600">
          There was a problem loading the requested NFT collection
        </div>
      )}
    </div>
  );
}

NFTContract.Layout = BaseLayout;
