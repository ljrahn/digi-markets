import React from "react";
import { SearchIcon } from "@heroicons/react/outline";
import { WalletConnect } from "@components/ui/common";
import { useWalletInfo } from "@components/hooks/web3";
import NetworkConnection from "@components/ui/web3/networkConnection";

const Sidebar = ({ showSidebar }) => {
  const { account } = useWalletInfo();

  const start_and_end = (str) => {
    if (str?.length > 20) {
      return str.substr(0, 15) + "..." + str.substr(str.length - 5, str.length);
    } else {
      return str;
    }
  };

  return (
    <div
      className={`flex flex-col justify-center w-64 h-screen px-4 pb-64 border-r bg-gray-800 border-gray-600 fixed right-0 z-30 ease-in-out duration-300 ${
        showSidebar ? "translate-x-0 " : "translate-x-full"
      }`}
    >
      <WalletConnect className="w-full" />
      {account.data ? (
        <div className="font-medium mx-auto text-center lg:mx-3 text-gray-300 mt-5">
          <p>Connected Address:</p>
          <p className="lowercase">{start_and_end(account.data)}</p>
        </div>
      ) : null}
      <div className="">
        <NetworkConnection />
      </div>
    </div>
  );
};

export default Sidebar;
