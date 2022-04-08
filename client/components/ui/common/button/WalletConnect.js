import { useAccount } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import React from "react";
import { Button } from "components/ui/common";

const WalletConnect = ({ className }) => {
  const { connect, isLoading, requireInstall } = useWeb3();
  const { account } = useAccount();

  return (
    <>
      {isLoading ? (
        <Button className={className} disabled={true}>
          Loading...
        </Button>
      ) : account.data ? (
        <Button className={`cursor-default ${className}`} hoverable={false}>
          Connected
        </Button>
      ) : requireInstall ? (
        <Button
          className={className}
          onClick={() =>
            window.open("https://metamask.io/download.html", "_blank")
          }
        >
          Install Metamask
        </Button>
      ) : (
        <Button className={className} onClick={connect}>
          Connect
        </Button>
      )}
    </>
  );
};

export default WalletConnect;
