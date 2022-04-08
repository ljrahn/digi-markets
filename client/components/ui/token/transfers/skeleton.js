import React from "react";

const TokenTransfersSkeleton = () => {
  return (
    <div className="bg-gray-700 mx-auto p-2 sm:p-4 rounded-2xl shadow-lg flex flex-col select-none">
      <div className="flex flex-col items-center flex-1 gap-5 sm:p-2">
        <div className="bg-gray-400 w-2/3 animate-pulse h-14 mb-4 rounded-2xl"></div>
        <div className="bg-gray-400 w-full animate-pulse h-3 rounded-2xl"></div>
        <div className="bg-gray-400 w-full animate-pulse h-3 rounded-2xl"></div>
        <div className="bg-gray-400 w-full animate-pulse h-3 rounded-2xl"></div>
        <div className="bg-gray-400 w-full animate-pulse h-3 rounded-2xl"></div>
        <div className="bg-gray-400 w-full animate-pulse h-3 rounded-2xl"></div>
        <div className="bg-gray-400 w-full animate-pulse h-3 rounded-2xl"></div>
        <div className="bg-gray-400 w-full animate-pulse h-3 rounded-2xl"></div>
        <div className="bg-gray-400 w-1/5 animate-pulse h-3 rounded-2xl"></div>
        <div className="flex w-full justify-center gap-1">
          <div className="bg-gray-400 w-28 animate-pulse h-8 rounded-md"></div>
          <div className="bg-gray-400 w-28 animate-pulse h-8 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default TokenTransfersSkeleton;
