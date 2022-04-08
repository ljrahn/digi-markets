import NFTMetaDataParser from "@utils/nftMetaDataParser";
import { useState, useEffect } from "react";

const TokenImage = ({ tokenData }) => {
  const [loaded, setLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const nftMetaDataParser = new NFTMetaDataParser(tokenData);

  useEffect(async () => {
    try {
      setImageSrc(await nftMetaDataParser.getImageUrl());
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className="bg-gray-700 w-full mx-auto rounded-2xl shadow-lg">
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
        <img src={imageSrc} width="100%" onLoad={() => setLoaded(true)} />
      </div>
    </div>
  );
};

export default TokenImage;
