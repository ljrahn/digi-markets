import React from "react";

const TokenImageSkeleton = () => {
  return (
    <div className="bg-gray-700 w-full mx-auto rounded-lg shadow-lg p-3">
      <div
        className="bg-gray-600 animate-pulse rounded-2xl"
        style={{ content: "", display: "block", paddingBottom: "100%" }}
      />
    </div>
  );
};

export default TokenImageSkeleton;
