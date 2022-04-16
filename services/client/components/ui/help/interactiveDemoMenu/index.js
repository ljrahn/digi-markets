import useInteractiveDemo from "@components/hooks/interactiveDemo";
import { useAccount } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import { Button, Modal } from "@components/ui/common";
import React from "react";

const stepMessages = {
  1: (
    <p>
      This button will open a sidebar that contains information about your
      wallet and the connected network. Click it to proceed
    </p>
  ),
  2: (
    <p>
      Looks like your wallet is properly connected, you can now use all the
      features of this website. Click Next so we can continue exploring.
    </p>
  ),
  3: <p>Click this bell icon to see your recent NFT transactions.</p>,
  4: <p>Here you can view recent NFT transactions. Click Next to continue.</p>,
  5: (
    <p>
      This search bar is used to search all NFT collections. Remember, only NFT
      collections for the network you are connected to will display. If you want
      to see collections from another network, you must change your network in
      your metamask wallet! Click Next to continue.
    </p>
  ),
  6: (
    <p>
      You can view your NFT&apos;s and your transactions by clicking this link.
      Click Next to continue
    </p>
  ),
  7: (
    <p>
      Thats it you&apos;re all set! Currently there is no marketplace features
      to allow buying and selling of NFT&apos;s but that will be coming soon,
      stay tuned! If you have any other questions, well, you&apos;re on your own{" "}
      <span className="text-xl">😂</span>. Click End Demo to end this demo.
    </p>
  ),
};

const InteractiveDemoMenu = () => {
  const { requireInstall } = useWeb3();
  const { account } = useAccount();
  const { step, demoStarted, endDemo, increaseStep } = useInteractiveDemo();

  return (
    <Modal isOpen={demoStarted}>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="mb-7 text-lg font-bold leading-6 text-gray-900 text-center"
                id="modal-title"
              >
                Interactive Demo
              </h3>
              <div className="mt-1 relative rounded-md text-center">
                {step == 2 && requireInstall ? (
                  <p>
                    Looks like metamask is not installed. Metamask is required
                    in order to use this website. Click &quot;Install
                    Metamask&quot; and follow the steps on screen to install
                    metamask. (Really, it only takes 2 minutes!)
                  </p>
                ) : step == 2 && !account.data ? (
                  <p>
                    Connect your metamask wallet to the website by clicking
                    &quot;Connect&quot;. This is required so that you can view
                    your NFT collection.
                  </p>
                ) : (
                  stepMessages[step]
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-between">
          <Button variant="red" onClick={endDemo}>
            End Demo
          </Button>
          {(step == 2 && !requireInstall && account.data) ||
          step == 4 ||
          step == 5 ||
          step == 6 ? (
            <Button variant="green" onClick={increaseStep}>
              Next
            </Button>
          ) : null}
        </div>
      </div>
    </Modal>
  );
};

export default InteractiveDemoMenu;
