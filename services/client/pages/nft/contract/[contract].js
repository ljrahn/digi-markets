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
import { useState } from "react";

export default function NFTContract() {
  const router = useRouter();
  const [cursors, setCursors] = useState([""]);
  const [page, setPage] = useState(1);
  const { contract } = router.query;

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
    cursor: cursors[page - 1],
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
            setCursors={setCursors}
            cursors={cursors}
            setPage={setPage}
          />
        </div>
      </div>
    </>
  );
}

NFTContract.Layout = BaseLayout;
