import React from "react";

const TokenMetadataSkeleton = () => {
  return (
    <div className="bg-gray-700 mx-auto p-2 sm:p-4 rounded-2xl shadow-lg flex flex-col select-none">
      <div className="flex flex-col flex-1 gap-5 sm:p-2">
        <div className="bg-gray-400 w-full animate-pulse h-14 mb-4 rounded-2xl"></div>
        <div className="bg-gray-400 w-full animate-pulse h-3 rounded-2xl"></div>
        <div className="bg-gray-400 w-full animate-pulse h-3 rounded-2xl"></div>
        <div className="bg-gray-400 w-full animate-pulse h-3 rounded-2xl"></div>
        <div className="bg-gray-400 w-full animate-pulse h-3 rounded-2xl"></div>
        <div className="bg-gray-400 w-full animate-pulse h-3 rounded-2xl"></div>
        <div className="bg-gray-400 w-full animate-pulse h-3 rounded-2xl"></div>
        <div className="bg-gray-400 w-full animate-pulse h-3 rounded-2xl"></div>
        <div className="bg-gray-400 w-full animate-pulse h-3 rounded-2xl"></div>
      </div>
    </div>
  );
};

export default TokenMetadataSkeleton;
