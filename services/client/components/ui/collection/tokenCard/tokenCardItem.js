import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import NFTMetaDataParser from "@utils/nftMetaDataParser";
import { Loader } from "@components/ui/common";

export default function TokenCardItem({ tokenData }) {
  const [loaded, setLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const func = async () => {
      try {
        setImageSrc(null);
        setLoaded(false);
        const nftMetaDataParser = new NFTMetaDataParser(tokenData);
        const image = await nftMetaDataParser.getImageUrl();
        if (image) {
          setImageSrc(image);
          setImgError(false);
        } else {
          setImgError(true);
          console.error(
            `Could not parse image data for ${tokenData.name} - #${tokenData.token_id}. token_uri data should contain "image" or "image_url" `
          );
        }
      } catch (err) {
        setImgError(true);
        console.error(err);
      }
    };
    func();
  }, [tokenData]);

  return (
    <div className="flex flex-col font-mono justify-evenly p-2 bg-gray-700 w-full h-full mx-auto rounded-2xl shadow-lg">
      <>
        {!imgError ? (
          <>
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
              className={`bg-gray-500 h-auto overflow-hidden ${
                !loaded && "hidden"
              }`}
            >
              <img
                alt="Token Image"
                src={imageSrc}
                width="100%"
                onLoadCapture={() => setLoaded(true)}
              />
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center text-center text-gray-200 bg-gray-600 text-sm h-44 py-3 px-8">
            <Image src="/no_items.png" width={30} height={30} />
            <span className="ml-1">Error Fetching Image</span>
          </div>
        )}
      </>

      <div className="p-3">
        <div className="flex my-2 items-center">
          <div className="text-sm text-gray-100 overflow-hidden text-ellipsis">
            {tokenData.symbol}
          </div>
          <div className="text-xs text-gray-300 ml-1 overflow-hidden text-ellipsis flex-1">
            #{tokenData.token_id}
          </div>
          <div className="text-sm text-gray-100 ml-auto">
            {tokenData.contract_type}
          </div>
        </div>
      </div>
    </div>
  );
}
