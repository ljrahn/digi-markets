import React from "react";
import { MenuIcon } from "@heroicons/react/outline";
import { IdentificationIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import { GlobalSearch } from "@components/ui/common";
import { BellMyTransfers } from "@components/ui/accountAssets";
import { useAccount } from "@components/hooks/web3";
import Link from "next/link";
import { InteractiveDemoArrow } from "@components/ui/help";
import useInteractiveDemo from "@components/hooks/interactiveDemo";

const Navbar = ({ showSidebar, setShowSidebar }) => {
  const [expandMenu, setExpandMenu] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { account } = useAccount();
  const accountData = account.data;

  const { step, increaseStep, demoStarted } = useInteractiveDemo();

  useEffect(() => {
    setMounted(true);
  }, []);

  const sideBarClick = () => {
    setShowSidebar(!showSidebar);
    if (step == 1 && demoStarted) {
      increaseStep();
    }
  };

  const bellClick = () => {
    if (step == 3 && demoStarted) {
      increaseStep();
    }
  };

  return (
    <>
      <nav className="py-4 px-5 md:px-20 sm:px-10 bg-gray-800 sticky top-0 z-50 flex justify-between">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold mr-3 hidden sm:block text-blue-500 hover:text-blue-700">
            <Link href="/">
              <a
                className={`text-2xl font-bold lg:text-3xl ${
                  demoStarted ? "pointer-events-none" : ""
                }`}
              >
                DigiMarkets
              </a>
            </Link>
          </div>
          <div className="hidden lg:flex flex-row items-center mx-0 lg:mx-3">
            <Link href="/">
              <a
                className={`font-medium mx-2 lg:mx-3 ${
                  demoStarted ? "pointer-events-none" : ""
                } ${
                  mounted && window.location.pathname == "/"
                    ? "text-blue-500 hover:text-blue-600"
                    : "text-gray-300 hover:text-gray-400"
                }`}
              >
                Home
              </a>
            </Link>
            <Link href={`/nft/eoa/${accountData}`}>
              <a
                className={`font-medium mx-2 lg:mx-3 relative ${
                  demoStarted ? "pointer-events-none" : ""
                }
              ${
                mounted && window.location.pathname == `/nft/eoa/${accountData}`
                  ? "text-blue-500 hover:text-blue-600"
                  : "text-gray-300 hover:text-gray-400"
              }`}
              >
                My NFT&apos;s
                {step == 6 && (
                  <InteractiveDemoArrow direction="up" className="right-6" />
                )}
              </a>
            </Link>
            <Link href={`/help`}>
              <a
                className={`font-medium mx-2 lg:mx-3 ${
                  demoStarted ? "pointer-events-none" : ""
                } ${
                  mounted && window.location.pathname == `/help`
                    ? "text-blue-500 hover:text-blue-600"
                    : "text-gray-300 hover:text-gray-400"
                }`}
              >
                Help
              </a>
            </Link>
          </div>
        </div>
        <div className="relative flex-3 max-w-md ml-auto mr-2">
          <GlobalSearch />
        </div>

        <div className="inline-flex items-center">
          <div className="mt-2 mx-3 relative">
            <BellMyTransfers onClick={bellClick} />
            {step == 3 || step == 4 ? (
              <InteractiveDemoArrow direction="up-right" className="right-6" />
            ) : null}
          </div>

          <button onClick={sideBarClick} className="mx-3 relative">
            <IdentificationIcon className="h-7 w-7  text-white" />

            {step == 1 && (
              <InteractiveDemoArrow direction="up-right" className="right-6" />
            )}
          </button>

          <button
            type="button"
            className="ml-3 inline-block lg:hidden relative"
            aria-label="toggle menu"
            onClick={() => setExpandMenu(!expandMenu)}
          >
            <MenuIcon className="h-6 w-6 text-white" />
            {step == 6 && !expandMenu && (
              <InteractiveDemoArrow direction="up" />
            )}
          </button>
        </div>
      </nav>
      <div
        className={`fixed top-16 bg-gray-800 pb-2 px-5 md:px-20 sm:px-10 z-40 flex flex-col xs:flex-row w-full lg:hidden ease-in-out duration-300 ${
          expandMenu ? `translate-y-0` : `-translate-y-full`
        }`}
      >
        <Link href="/">
          <a
            className={`my-1 font-medium mr-4 ${
              demoStarted ? "pointer-events-none" : ""
            } ${
              mounted && window.location.pathname == "/"
                ? "text-blue-500 hover:text-blue-600"
                : "text-gray-300 hover:text-gray-400"
            }`}
          >
            Home
          </a>
        </Link>
        <Link href={`/nft/eoa/${accountData}`}>
          <a
            className={`my-1 font-medium mr-4 relative ${
              demoStarted ? "pointer-events-none" : ""
            } ${
              mounted && window.location.pathname == `/nft/eoa/${accountData}`
                ? "text-blue-500 hover:text-blue-600"
                : "text-gray-300 hover:text-gray-400"
            }`}
          >
            My NFT&apos;s
            {step == 6 && expandMenu && (
              <InteractiveDemoArrow direction="up" className="left-4" />
            )}
          </a>
        </Link>
        <Link href={`/help`}>
          <a
            className={`my-1 font-medium mr-4 relative ${
              demoStarted ? "pointer-events-none" : ""
            } ${
              mounted && window.location.pathname == `/help`
                ? "text-blue-500 hover:text-blue-600"
                : "text-gray-300 hover:text-gray-400"
            }`}
          >
            Help
          </a>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
