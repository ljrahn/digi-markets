import { useEthPrice, useNetworkData } from "@components/hooks/server";
import { Loader } from "@components/ui/common";
import Image from "next/image";

export default function EthRates() {
  const price = useEthPrice();
  const { networkData, error } = useNetworkData();

  const currencyMatic = networkData?.currency == "MATIC";

  return (
    <div className="p-6 border drop-shadow rounded-md bg-white">
      {!error ? (
        <>
          {price.data ? (
            <>
              <div className="flex items-center justify-center">
                <Image
                  layout="fixed"
                  height={currencyMatic ? "25" : "35"}
                  width={currencyMatic ? "25" : "35"}
                  src={currencyMatic ? "/polygon-token.png" : "/small-eth.webp"}
                />
                <span
                  className={`text-xl font-bold ${currencyMatic && "ml-1"}`}
                >
                  = ${price.data}
                </span>
              </div>
              <p className="text-lg text-gray-500">
                Current {currencyMatic ? "MATIC" : "ETH"} Price
              </p>
            </>
          ) : (
            <div className="w-full flex justify-center">
              <Loader />
            </div>
          )}
        </>
      ) : (
        <p className="text-lg text-gray-500">{error}</p>
      )}
    </div>
  );
}
