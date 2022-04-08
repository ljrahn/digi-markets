import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import NFTMetaDataParser from "@utils/nftMetaDataParser";
import { Loader } from "@components/ui/common";

export default function TokenCard({ contract, item }) {
  const [loaded, setLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const nftMetaDataParser = new NFTMetaDataParser(item);

  useEffect(async () => {
    try {
      setImageSrc(await nftMetaDataParser.getImageUrl());
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className="flex flex-col justify-evenly bg-gray-700 w-full mx-auto rounded-2xl shadow-lg">
      {loaded && imageSrc ? null : (
        <div
          className="bg-gray-500 h-auto overflow-hidden animate-pulse"
          style={{
            content: "",
            display: "block",
            paddingBottom: "100%",
          }}
        ></div>
      )}
      <div
        className={`bg-gray-500 h-auto overflow-hidden ${!loaded && "hidden"}`}
      >
        <img
          src={imageSrc}
          width="100%"
          onLoadCapture={() => setLoaded(true)}
        />
      </div>

      <div className="p-3">
        <div className="flex my-2 items-center">
          <div className="text-sm text-gray-100 overflow-hidden text-ellipsis">
            {item.symbol}
          </div>
          <div className="text-xs text-gray-300 ml-1">#{item.token_id}</div>
          <div className="text-sm text-gray-100 ml-auto">
            {item.contract_type}
          </div>
        </div>
      </div>
    </div>
  );
}
