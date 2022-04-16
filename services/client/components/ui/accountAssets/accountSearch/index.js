import { SearchIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";

const AccountSearch = ({ contractAddress }) => {
  const [text, setText] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    router.push(`/nft/eoa/${text}?page=1`);
    setText("");
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="">
        <div className="relative ">
          <button
            type="submit"
            className="absolute inset-y-0 left-0 flex items-center pl-3"
          >
            <SearchIcon className="w-5 h-5 text-gray-600" />
          </button>
          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 rounded-md bg-gray-200 text-gray-600 border-gray-400 placeholder-gray-600 border-2 text-sm focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            placeholder="Search Account Address (Exact)"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </label>
    </form>
  );
};

export default AccountSearch;
