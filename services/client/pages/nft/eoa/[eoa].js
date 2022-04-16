import { useAccountNFT } from "@components/hooks/server";
import { useAccount } from "@components/hooks/web3";
import { AssetsHeader } from "@components/ui/accountAssets";
import { TokenCard } from "@components/ui/collection";
import { Breadcrumbs, Pagination } from "@components/ui/common";
import { BaseLayout } from "@components/ui/layout";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AccountNFT() {
  const router = useRouter();
  const { account } = useAccount();
  const accountData = account.data;
  const [error, setError] = useState(null);
  const { eoa, page } = router.query;
  const {
    data: tokenListData,
    error: tokenListError,
    isValidating: tokenListIsValidating,
  } = useAccountNFT({
    accountAddress: eoa != "undefined" && eoa ? eoa : null,
    page: page,
  });

  useEffect(() => {
    if (tokenListError) {
      try {
        setError(
          tokenListError.info.message.message
            ? tokenListError.info.message.message
            : tokenListError.info.message
            ? tokenListError.info.message
            : "There was an error with your request"
        );
      } catch (err) {
        console.error(err);
        setError("There was an error with your request");
      }
    }
    if (tokenListData || tokenListIsValidating) {
      setError(null);
    }
  }, [tokenListError, tokenListData]);

  return (
    <>
      <Head>
        <title>My NFT&apos;s</title>
      </Head>
      <div className="my-8 flex flex-col justify-center">
        <AssetsHeader title="Collection" />
        {!error ? (
          <>
            {eoa != "undefined" && eoa ? (
              <>
                {!tokenListIsValidating && !tokenListError && tokenListData && (
                  <>
                    {tokenListData.total == 0 && (
                      <div className="text-center text-2xl font-extrabold text-gray-600 mt-3">
                        This account has 0 NFT&apos;s
                      </div>
                    )}
                  </>
                )}
                <div className="mt-10">
                  <TokenCard
                    tokenListData={tokenListData}
                    tokenListIsValidating={tokenListIsValidating}
                    tokenListError={tokenListError}
                  />
                </div>
              </>
            ) : (
              <div className="text-center text-2xl font-extrabold text-gray-600 mt-3">
                You must connect your wallet to view NFT&apos;s
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-2xl font-extrabold text-gray-600 mt-3">
            Error: {error}
          </div>
        )}
      </div>
    </>
  );
}

AccountNFT.Layout = BaseLayout;
