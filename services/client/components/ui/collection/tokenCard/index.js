import TokenCardItem from "./tokenCardItem";
import TokenSkeleton from "./tokenSkeleton";
import Link from "next/link";
import { Message, Pagination } from "@components/ui/common";

export default function TokenCard({
  tokenListData,
  tokenListIsValidating,
  tokenListError,
  cursors,
  setCursors,
  setPage,
}) {
  return (
    <>
      {!tokenListError ? (
        <>
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {!tokenListIsValidating && tokenListData
              ? tokenListData?.result.map((tokenData, index) => (
                  <Link
                    key={index}
                    href={`/nft/contract/${tokenData.contract_address}/${tokenData.token_id}?page=1`}
                  >
                    <a>
                      <TokenCardItem tokenData={tokenData} />
                    </a>
                  </Link>
                ))
              : Array(12)
                  .fill(0)
                  .map((_, index) => <TokenSkeleton key={index} />)}
          </div>
          {!tokenListIsValidating && tokenListData && (
            <div className="mt-10">
              <Pagination
                data={tokenListData}
                cursors={cursors}
                setCursors={setCursors}
                setPage={setPage}
              />
            </div>
          )}
        </>
      ) : (
        <div className="mt-5 text-lg">
          <Message type="warning">
            There was a problem loading the requested NFT Collection
          </Message>
        </div>
      )}
    </>
  );
}
