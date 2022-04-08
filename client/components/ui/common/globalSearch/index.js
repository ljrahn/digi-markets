import { SearchIcon } from "@heroicons/react/outline";
import { useContractSearch } from "@components/hooks/server";
import React, { useEffect, useState, useRef } from "react";
import Loader from "../loader";
import { ActiveLink } from "@components/ui/common";
import { MdVerified } from "react-icons/md";
import {} from "react-icons";
import Image from "next/image";
import { useRouter } from "next/router";

const SearchCollection = () => {
  const [focused, setFocused] = useState(false);
  const [text, setText] = useState(null);
  const inputRef = useRef(null);
  const contract_data = useContractSearch({
    text: text ? text : null,
    pageSize: 10,
  });
  const router = useRouter();

  const setFalse = (e) => {
    if (e.target != inputRef.current) {
      setFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", (e) => setFalse(e));
    return document.removeEventListener("click", (e) => setFalse(e));
  }, []);

  const onFocus = () => setFocused(true);

  const onChange = (e) => {
    setText(e.target.value);
  };

  const handlePressEnter = (e) => {
    if (e.key === "Enter") {
      if (text.startsWith("0x")) {
        router.push({
          pathname: `/nft/${text}`,
          query: { page: 1 },
        });
        setInputBlank();
      }
    }
  };

  const setInputBlank = () => {
    inputRef.current.value = "";
    setText("");
  };

  return (
    <div>
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <SearchIcon className="w-5 h-5 text-gray-400" />
      </span>

      <input
        type="text"
        className="w-full py-2 pl-10 pr-4 border rounded-md bg-gray-800 text-gray-300 border-gray-600 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
        placeholder="Search NFT Collections"
        ref={inputRef}
        onFocus={onFocus}
        onChange={onChange}
        onKeyUp={handlePressEnter}
      />
      <div
        id="dropdownInformation"
        className="absolute top-12 z-60 rounded-lg shadow bg-gray-700"
        style={{ width: inputRef.current?.offsetWidth }}
      >
        {focused &&
          !contract_data.isLoading &&
          text &&
          contract_data.data?.result.map((contract, idx) => (
            <ActiveLink
              key={idx}
              href={{
                pathname: `/nft/${contract.contract_address}`,
                query: { page: 1 },
              }}
            >
              <a onClick={setInputBlank}>
                <div
                  className="py-4 px-6 text-white text-md flex items-center"
                  style={{ borderTop: idx != 0 ? "1px solid gray" : "" }}
                >
                  {contract.image && (
                    <span className="h-6 w-6 mr-2">
                      <Image
                        className="align-middle"
                        height="45"
                        width="45"
                        layout="responsive"
                        src={contract.image}
                      />
                    </span>
                  )}
                  <span>{contract.name}</span>
                  {contract.verified && (
                    <span className="ml-2">
                      <MdVerified size={21} color="rgb(81 164 247)" />
                    </span>
                  )}
                  <span className="ml-auto text-xs text-gray-400 align-middle">
                    {contract.contract_type}
                  </span>
                </div>
              </a>
            </ActiveLink>
          ))}
        {focused && contract_data.isLoading && text && (
          <div className="py-3 px-4 mx-auto text-white text-sm">
            <Loader color="white" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCollection;
