import { Button, Hero } from "@components/ui/common";
import { PopularCollections } from "@components/ui/common";
import { InteractiveDemoArrow } from "@components/ui/help";
import InteractiveDemoMenu from "@components/ui/help/interactiveDemoMenu";
import InteractiveDemoStart from "@components/ui/help/interactiveDemoStart";
import { BaseLayout } from "@components/ui/layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Help() {
  return (
    <>
      <Head>
        <title>Help</title>
      </Head>
      <InteractiveDemoMenu />
      <div className="my-10">
        <div className="text-5xl font-extrabold leading-none text-center">
          Get Started
        </div>
        <div className="mt-6 w-2/3 mx-auto text-md md:text-lg font-light text-true-gray-500 antialiased text-center">
          <p>
            To get started, you may want to go through the interactive demo to
            get a feel for the different features of this website. Click below
            to get started.
          </p>
        </div>
        <div className="mt-5 w-fit mx-auto">
          <InteractiveDemoStart />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-y-20 gap-y-8 mt-16 items-center">
          <div>
            <div className="text-4xl mt-10 md:mt-0 font-extrabold leading-none text-center">
              How To Connect
            </div>
            <div className="mt-6 mx-auto text-md md:text-lg font-light text-true-gray-500 antialiased text-center">
              <p>
                In order to use this website you must first connect a metamask
                wallet to the website. This will give the website the
                information necessary to know what NFT’s you own as well as a
                record of your NFT transactions. Since the website can display
                NFT’s for multiple different networks, it will also pull the
                information for the network you are connected to, to display the
                corresponding NFT’s. If you are having trouble finding your NFT
                collection, make sure your metamask wallet is connected to the
                right network. Currently this website only supports EVM
                (Ethereum Virtual Machine) compatible chains. The following
                chains are currently supported:
                <div className="font-extrabold italic">
                  Ethereum Mainnet, Polygon Mainnet, Rinkeby Testnet, Goerli
                  Testnet, Ropsten Testnet, Kovan Testnet, Mumbai Testnet
                  (Polygon)
                </div>
              </p>
            </div>
          </div>
          <div className="w-auto">
            <img
              alt="Metamask Image"
              src="/img/metamask_img.jpeg"
              className="rounded-xl"
            />
          </div>
          <div className="w-auto md:block hidden">
            <img
              alt="BAYC Collection Image"
              src="/img/BAYC_img.png"
              className="rounded-xl"
            />
          </div>
          <div className="">
            <div className="text-4xl mt-10 md:mt-0 font-extrabold leading-none text-center">
              Check Out Different Collections
            </div>
            <div className="mt-6 mx-auto text-md md:text-lg font-light text-true-gray-500 antialiased text-center">
              <p>
                You can view any NFT collection for the network you&apos;re
                connected to by using the search bar in the navigation menu. If
                you can&apos;t see it in the drop down menu you may need need to
                enter the exact contract address for the NFT collection. From
                there you can browse the different tokens for that NFT
                collection, or enter the exact token ID for the token you wish
                to view. Currently there is no marketplace feature to buy and
                sell NFT&apos;s, but that will be coming soon, stay tuned!
              </p>
            </div>
          </div>
          <div className="w-auto block md:hidden">
            <img
              alt="BAYC Collection Image"
              src="/img/BAYC_img.png"
              className="rounded-xl"
            />
          </div>
          <div>
            <div className="text-4xl mt-10 md:mt-0 font-extrabold leading-none text-center">
              Open Source
            </div>
            <div className="mt-6 mx-auto text-md md:text-lg font-light text-true-gray-500 antialiased text-center">
              <p>
                This is an open source project created by{" "}
                <span>
                  <a
                    href="https://github.com/lucasrahn09"
                    className="text-blue-500 hover:text-blue-700"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Lucas Rahn
                  </a>
                </span>
                . If you would like to contribute, head over to the github page{" "}
                <span>
                  <a
                    href="https://github.com/lucasrahn09/digi-markets"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    lucasrahn09/digi-markets
                  </a>
                </span>{" "}
                and make a pull request, or if you would like to fire up your
                own replica, follow the README in the repository.
              </p>
            </div>
          </div>
          <div className="w-auto">
            <img
              alt="Github Image"
              src="/img/github_img.png"
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </>
  );
}

Help.Layout = BaseLayout;
