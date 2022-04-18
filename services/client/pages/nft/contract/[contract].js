import { useContractMetadata, useTokenList } from "@components/hooks/server";
import { BaseLayout } from "@components/ui/layout";
import { useRouter } from "next/router";
import {
  ContractHeaderCard,
  SearchToken,
  TokenCard,
} from "@components/ui/collection";
import { Pagination } from "@components/ui/common";
import React from "react";

import MetadataPostFetcher from "@utils/metadataPostFetcher";
import Head from "next/head";

export default function NFTContract() {
  const router = useRouter();
  const { contract, page } = router.query;

  const {
    data: contractMetadata,
    isLoading: contractMetadataIsLoading,
    error: contractMetadataError,
  } = MetadataPostFetcher(contract);

  const {
    data: tokenListData,
    error: tokenListError,
    isValidating: tokenListIsValidating,
  } = useTokenList({
    contractAddress: contract,
    page: page,
  });

  return (
    <>
      <Head>
        <title>NFT Collection</title>
      </Head>
      <div className="my-8">
        <div className="mx-auto w-full lg:w-4/5">
          <ContractHeaderCard
            contractMetadata={contractMetadata}
            contractMetadataIsValidating={contractMetadataIsLoading}
            contractMetadataError={contractMetadataError}
          />
        </div>

        <div className="mt-6">
          <TokenCard
            tokenListData={tokenListData}
            tokenListIsValidating={tokenListIsValidating}
            tokenListError={tokenListError}
          />
        </div>
      </div>
    </>
  );
}

NFTContract.Layout = BaseLayout;
