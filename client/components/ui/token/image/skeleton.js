import React from "react";

const TokenImageSkeleton = () => {
  return (
    <div className="bg-gray-700 w-full mx-auto rounded-2xl shadow-lg">
      <div
        className="bg-gray-500 overflow-hidden animate-pulse"
        style={{ content: "", display: "block", paddingBottom: "100%" }}
      />
      <div className="p-3">
        <div className="grid grid-cols-3 gap-4 mt-2">
          <div className="h-3 bg-gray-400 rounded animate-pulse"></div>
          <div className="h-3 bg-gray-400 rounded animate-pulse"></div>
          <div className="h-3 bg-gray-400 rounded animate-pulse"></div>
          <div className="col-span-2"></div>
        </div>
      </div>
    </div>
  );
};

export default TokenImageSkeleton;
