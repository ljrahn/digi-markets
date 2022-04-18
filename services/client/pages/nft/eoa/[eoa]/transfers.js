import { useAccountNFTTransfers } from "@components/hooks/server";
import { useAccount } from "@components/hooks/web3";
import { AssetsHeader } from "@components/ui/accountAssets";
import { BaseLayout } from "@components/ui/layout";
import { AccountTokenTransfers } from "@components/ui/accountAssets";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import { Message } from "@components/ui/common";

export default function AccountNFTTransfers() {
  const router = useRouter();
  const { account } = useAccount();
  const [error, setError] = useState(null);
  const accountData = account.data;
  const { eoa, page } = router.query;
  const {
    data: tokenTransferData,
    error: tokenTransferError,
    isValidating: tokenTransferIsValidating,
  } = useAccountNFTTransfers({
    accountAddress: eoa != "undefined" && eoa ? eoa : null,
    page: page,
    pageSize: 8,
  });

  useEffect(() => {
    if (tokenTransferError) {
      try {
        setError(
          tokenTransferError.info.message.message
            ? tokenTransferError.info.message.message
            : tokenTransferError.info.message
            ? tokenTransferError.info.message
            : "There was an error with your request"
        );
      } catch (err) {
        console.error(err);
        setError("There was an error with your request");
      }
    }
    if (tokenTransferData && !tokenTransferError) {
      setError(null);
    }
  }, [tokenTransferError, tokenTransferData]);

  return (
    <>
      <Head>
        <title>NFT Transfers</title>
      </Head>
      <div className="my-8 flex flex-col justify-center">
        <AssetsHeader title="Transfers" />

        {!error ? (
          <>
            {eoa != "undefined" && eoa ? (
              <>
                {!tokenTransferIsValidating &&
                  !tokenTransferError &&
                  tokenTransferData && (
                    <>
                      {tokenTransferData.total == 0 ? (
                        <div className="mt-5 text-lg">
                          <Message type="warning">
                            This account has 0 NFT Transactions
                          </Message>
                        </div>
                      ) : (
                        <div className="mt-10 w-full mx-auto">
                          <AccountTokenTransfers
                            tokenTransferData={tokenTransferData}
                            tokenTransferIsValidating={
                              tokenTransferIsValidating
                            }
                            tokenTransferError={tokenTransferError}
                          />
                        </div>
                      )}
                    </>
                  )}
              </>
            ) : (
              <div className="mt-5 text-lg">
                <Message type="warning">
                  You must connect your wallet to view NFT&apos;s
                </Message>
              </div>
            )}
          </>
        ) : (
          <div className="mt-5 text-lg">
            <Message type="danger">Error: {error}</Message>
          </div>
        )}
      </div>
    </>
  );
}

AccountNFTTransfers.Layout = BaseLayout;
