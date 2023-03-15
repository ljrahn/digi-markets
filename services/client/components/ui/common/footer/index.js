import { useAccount } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import Link from "next/link";
import { useEffect, useState } from "react";
import WalletConnect from "../button/WalletConnect";
import { BsGithub } from "react-icons/bs";
import { GlobalSearch } from "@components/ui/common";

export default function Footer() {
  const { contract } = useWeb3();
  const { account } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="bg-gray-800 pt-16">
      <div className="container divide-y divide-gray-500 mx-auto px-6">
        <div className="flex justify-between pb-8">
          <div className="w-1/3">
            <div className="text-xl font-bold text-white underline-offset-2 underline mb-4">
              About
            </div>
            <div className="font-bold text-xs sm:text-sm md:text-base text-gray-300">
              <p>
                Digimarkets is an open source, cross-chain NFT browser, that
                will soon become a full NFT marketplace. Here you can view your
                NFT&apos;s, view your NFT transactions, browse popular
                collections across multiple different blockchain networks, check
                out token attributes, and more!
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-center w-1/3">
            <div className="text-xl font-bold text-white underline-offset-2 underline">
              Navigation
            </div>
            <Link href="/">
              <a
                className={`
              ${
                mounted && window.location.pathname == "/"
                  ? "text-blue-500 hover:text-blue-600"
                  : "text-gray-300 hover:text-gray-400"
              }`}
              >
                Home
              </a>
            </Link>
            <Link href={`/nft/eoa/${account.data}`}>
              <a
                className={`
              ${
                mounted &&
                window.location.pathname == `/nft/eoa/${account.data}`
                  ? "text-blue-500 hover:text-blue-600"
                  : "text-gray-300 hover:text-gray-400"
              }`}
              >
                My NFT&apos;s
              </a>
            </Link>
            <Link href="/help">
              <a
                className={`
              ${
                mounted && window.location.pathname == "/help"
                  ? "text-blue-500 hover:text-blue-600"
                  : "text-gray-300 hover:text-gray-400"
              }`}
              >
                Help
              </a>
            </Link>
          </div>
          <div className="w-1/3 text-right flex flex-col gap-4">
            <div className="text-xl font-bold text-white underline-offset-2 underline">
              Other Resources
            </div>
            <div className="">
              <GlobalSearch rotate={true} />
            </div>
            <div>
              <WalletConnect />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between py-8">
          <div className="text-3xl font-bold text-blue-500 hover:text-blue-700 w-fit">
            <Link href="/">
              <a className="">DigiMarkets</a>
            </Link>
          </div>
          <div>
            <a
              href="https://github.com/lucasrahn09/digi-markets"
              target="_blank"
              rel="noreferrer"
            >
              <BsGithub size={30} className="text-white hover:text-gray-400" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
