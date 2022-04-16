import React from "react";
import { WalletConnect } from "@components/ui/common";
import { useAccount } from "@components/hooks/web3";
import NetworkConnection from "@components/ui/web3/networkConnection";
import { EthRates } from "@components/ui/web3";
import useInteractiveDemo from "@components/hooks/interactiveDemo";
import { InteractiveDemoArrow } from "@components/ui/help";
import { useWeb3 } from "@components/providers";

const Sidebar = ({ showSidebar }) => {
  const { account } = useAccount();
  const { requireInstall } = useWeb3();
  const { step, demoStarted } = useInteractiveDemo();

  const start_and_end = (str) => {
    if (str?.length > 20) {
      return str.substr(0, 15) + "..." + str.substr(str.length - 5, str.length);
    } else {
      return str;
    }
  };

  return (
    <div
      className={`flex flex-col gap-10 justify-center w-72 h-screen px-4 pb-64 border-r bg-gray-800 border-gray-600 fixed right-0 z-30 ease-in-out duration-300 ${
        showSidebar ? "translate-x-0 " : "translate-x-full"
      }`}
    >
      <div className="relative">
        {(step == 2 && requireInstall) || (step == 2 && !account.data) ? (
          <InteractiveDemoArrow direction="right" className="top-12 right-52" />
        ) : null}
      </div>
      <WalletConnect
        className={`mx-auto ${demoStarted ? "!px-2 w-2/3" : ""}`}
      />
      <div className="mx-auto">
        <EthRates />
      </div>
      {account.data ? (
        <div className="font-medium mx-auto text-center lg:mx-3 text-gray-300">
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
