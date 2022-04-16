import NFTMetaDataParser from "@utils/nftMetaDataParser";
import Image from "next/image";
import { useState, useEffect } from "react";
import TokenImageSkeleton from "./skeleton";

const TokenImage = ({ tokenData, isTokenValidating }) => {
  const [loaded, setLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const func = async () => {
      if (!isTokenValidating && tokenData) {
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
      }
    };

    func();
  }, [tokenData, isTokenValidating]);

  return (
    <>
      {!imgError ? (
        <>
          {!isTokenValidating && tokenData ? (
            <div className="bg-gray-700 w-full mx-auto rounded-lg shadow-lg p-3">
              {loaded && imageSrc ? null : (
                <div
                  className="bg-gray-600 h-auto overflow-hidden rounded-2xl animate-pulse"
                  style={{
                    content: "",
                    display: "block",
                    paddingBottom: "100%",
                  }}
                ></div>
              )}
              <div
                className={`bg-gray-700 rounded-lg h-auto overflow-hidden ${
                  !loaded && "hidden animate-pulse"
                }`}
              >
                <img
                  alt="Token Image"
                  src={imageSrc}
                  width="100%"
                  onLoad={() => setLoaded(true)}
                />
              </div>
            </div>
          ) : (
            <TokenImageSkeleton />
          )}
        </>
      ) : (
        <div className="flex justify-center items-center bg-gray-700 h-80 w-auto p-3 rounded-lg">
          <div className="flex justify-center items-center text-center text-gray-300 w-full h-full rounded-2xl shadow-lg bg-gray-600 align-middle">
            <Image src="/no_items.png" width={30} height={30} />
            <span className="ml-1">Error Fetching Image</span>
          </div>
        </div>
      )}
    </>
  );
};

export default TokenImage;
