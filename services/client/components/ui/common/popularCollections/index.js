import { useContractSearch, useNetworkData } from "@components/hooks/server";
import Link from "next/link";
import PopularCollectionsItem from "./popularCollectionsItem";
import PopularCollectionsItemSkeleton from "./popularCollectionsItemSkeleton";

export default function PopularCollections() {
  const {
    data: contractSearchData,
    isValidating: contractSearchIsValidating,
    error: contractSearchError,
  } = useContractSearch({
    text: "",
    pageSize: 6,
  });
  const {
    networkData,
    isValidating: networkIsValidating,
    error: networkError,
  } = useNetworkData();

  return (
    <>
      <div className="ml-6 text-center">
        <div className="text-5xl font-bold mb-5">Popular Collections</div>
        <div className="mb-10 text-xl font-light text-true-gray-500 antialiased">
          These are the most viewed collections on this website
          {networkData && !networkIsValidating && !networkError
            ? ` for ${networkData.name}`
            : null}
          !
        </div>
      </div>

      {!contractSearchError ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            {!contractSearchIsValidating && contractSearchData
              ? contractSearchData?.result.map((contractData, index) => (
                  <PopularCollectionsItem
                    key={index}
                    contractData={contractData}
                  />
                ))
              : Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <PopularCollectionsItemSkeleton key={index} />
                  ))}
          </div>
        </>
      ) : (
        <div className="text-center mt-12 text-2xl font-extrabold text-gray-600">
          There was a problem loading the Popular Collections
        </div>
      )}
    </>
  );
}
