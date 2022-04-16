import React from "react";

const PopularCollectionsItemSkeleton = () => {
  return (
    <div className="bg-gray-700 mx-auto p-2 sm:p-4 rounded-2xl shadow-lg flex flex-col gap-5 select-none w-full">
      <div className="h-44 w-44 mx-auto rounded-full bg-gray-400 animate-pulse"></div>
      <div className="flex flex-col flex-1 gap-5 sm:p-2">
        <div className="flex flex-1 flex-col gap-3">
          <div className="bg-gray-400 w-full animate-pulse h-14 rounded-2xl"></div>
          <div className="bg-gray-400 w-full animate-pulse h-3 rounded-2xl"></div>
          <div className="bg-gray-400 w-full animate-pulse h-3 rounded-2xl"></div>
          <div className="bg-gray-400 w-full animate-pulse h-3 rounded-2xl"></div>
          <div className="bg-gray-400 w-full animate-pulse h-3 rounded-2xl"></div>
        </div>
        <div className="bg-gray-400 w-32 mx-auto h-10 animate-pulse rounded-lg"></div>
      </div>
    </div>
  );
};

export default PopularCollectionsItemSkeleton;
