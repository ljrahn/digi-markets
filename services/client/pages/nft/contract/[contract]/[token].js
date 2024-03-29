import { useToken, useTokenTransfers } from "@components/hooks/server";
import { BaseLayout } from "@components/ui/layout";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import {
  TokenImage,
  TokenMetadata,
  TokenTransfers,
} from "@components/ui/token";
import { BackButton, Message } from "@components/ui/common";
import Head from "next/head";

export default function NFTToken({ previousUrl }) {
  const router = useRouter();
  const [goBackUrl, setGoBackUrl] = useState(null);
  const { contract, token } = router.query;
  const [cursors, setCursors] = useState([""]);
  const [page, setPage] = useState(1);

  const {
    data: tokenData,
    isValidating: isTokenValidating,
    error: tokenError,
  } = useToken({ contractAddress: contract, tokenId: token });

  const {
    data: tokenTransferData,
    isValidating: tokenTransferIsValidating,
    error: tokenTransferError,
  } = useTokenTransfers({
    contractAddress: contract,
    tokenId: token,
    cursor: cursors[page - 1],
  });

  useEffect(() => {
    setGoBackUrl(previousUrl);
  }, []);

  const onClickBack = () => {
    if (goBackUrl && goBackUrl != window.location.href) {
      router.push(goBackUrl);
    } else {
      router.push(`/nft/contract/${contract}?page=1`);
    }
  };

  return (
    <>
      <Head>
        <title>NFT Token</title>
      </Head>
      <BackButton onClick={onClickBack} />
      <div className="mb-8 mt-2">
        <>
          <div className="flex justify-center items-center flex-col-reverse lg:flex-row">
            {!tokenError ? (
              <>
                <div className="w-full md:w-4/5 lg:w-5/12 flex-none">
                  <TokenImage
                    tokenData={tokenData}
                    isTokenValidating={isTokenValidating}
                  />
                </div>
                <div className="w-full ml-0 lg:ml-5 mb-5 min-w-0">
                  <TokenMetadata
                    tokenData={tokenData}
                    isTokenValidating={isTokenValidating}
                  />
                </div>
              </>
            ) : (
              <div className="mt-5 text-lg">
                <Message type="warning">
                  There was a problem loading the requested NFT Token
                </Message>
              </div>
            )}
          </div>

          <div className="mt-10 w-full mx-auto">
            <TokenTransfers
              tokenTransferData={tokenTransferData}
              tokenTransferIsValidating={tokenTransferIsValidating}
              tokenTransferError={tokenTransferError}
              setCursors={setCursors}
              cursors={cursors}
              setPage={setPage}
            />
          </div>
        </>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      previousUrl: context.req.headers.referer
        ? context.req.headers.referer
        : null,
    },
  };
}

NFTToken.Layout = BaseLayout;
