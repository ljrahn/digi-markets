import React from "react";
import ActiveLink from "../link";
import { MenuIcon } from "@heroicons/react/outline";
import { IdentificationIcon, BellIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { GlobalSearch, SearchCollection } from "@components/ui/common";

const navigation = [
  {
    title: "Explore",
    href: "/",
  },
  {
    title: "My Collection",
    href: "/collection",
  },
];

const Navbar = ({ showSidebar, setShowSidebar }) => {
  const [expandMenu, setExpandMenu] = useState(false);

  return (
    <>
      <nav className="py-4 px-5 md:px-20 sm:px-10 bg-gray-800 sticky top-0 z-50 flex justify-between">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-700 mr-3 hidden sm:block">
            <ActiveLink href="/">
              <a className="text-2xl text-indigo-400 hover:text-indigo-600 font-bold lg:text-3xl">
                DigiMarkets
              </a>
            </ActiveLink>
          </div>
          <div className="hidden lg:flex flex-row items-center mx-0 lg:mx-3">
            {navigation.map((item, idx) => (
              <ActiveLink key={idx} href={item.href}>
                <a className="font-medium mx-2 lg:mx-3 text-gray-300 hover:text-gray-400">
                  {item.title}
                </a>
              </ActiveLink>
            ))}
          </div>
        </div>
        <div className="relative flex-3 max-w-md ml-auto">
          <GlobalSearch />
        </div>

        <div className="flex items-center">
          <button className="mx-3">
            <BellIcon className="h-6 w-6 text-white" />
          </button>

          <button onClick={() => setShowSidebar(!showSidebar)} className="mx-3">
            <IdentificationIcon className="h-7 w-7  text-white" />
          </button>

          <button
            type="button"
            className="ml-3 inline-block lg:hidden"
            aria-label="toggle menu"
            onClick={() => setExpandMenu(!expandMenu)}
          >
            <MenuIcon className="h-6 w-6 text-white" />
          </button>
        </div>
      </nav>
      <div
        className={`fixed top-16 bg-gray-800 pb-2 px-5 md:px-20 sm:px-10 z-40 flex flex-col xs:flex-row w-full lg:hidden ease-in-out duration-300 ${
          expandMenu ? `translate-y-0` : `-translate-y-full`
        }`}
      >
        {navigation.map((item, idx) => (
          <ActiveLink key={idx} href={item.href}>
            <a className="my-1 font-medium mr-4 text-gray-300 hover:text-gray-400">
              {item.title}
            </a>
          </ActiveLink>
        ))}
      </div>
    </>
  );
};

export default Navbar;
