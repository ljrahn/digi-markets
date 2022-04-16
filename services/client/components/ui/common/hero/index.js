import { EthRates } from "@components/ui/web3";
import Image from "next/image";
import Link from "next/link";
import Button from "../button";

export default function Hero() {
  return (
    <section className="text-white h-screen">
      <div className="z-20 relative pt-32">
        <div className="text-6xl font-semibold leading-none text-center">
          Welcome to DigiMarkets
        </div>
        <div className="mt-6 text-xl font-light text-true-gray-500 antialiased text-center">
          Browse digital collectibles, view token transactions, and manage your
          NFT&apos;s
        </div>
        <div className="flex flex-col items-center justify-center text-center my-10">
          <div>
            <div className="text-4xl font-bold leading-none">Need help?</div>
            <div className="mt-6 text-xl font-light text-true-gray-500 antialiased">
              Checkout out the help page to see how to use this website
            </div>
          </div>
          <Link href="/help">
            <a>
              <Button variant="blue" className="mt-4">
                Get Help
              </Button>
            </a>
          </Link>
        </div>
      </div>
      <div className="absolute inset-0 h-auto z-10">
        <img
          alt="Banner Image"
          className="h-full w-full"
          src="/banner/banner2.jpeg"
          style={{ objectFit: "cover" }}
        />
      </div>
    </section>
  );
}
