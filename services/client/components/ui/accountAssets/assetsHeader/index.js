import { useAccount } from "@components/hooks/web3";
import { Breadcrumbs } from "@components/ui/common";
import { useRouter } from "next/router";
import React from "react";
import AccountSearch from "../accountSearch";

const AssetsHeader = ({ title }) => {
  const router = useRouter();
  const { account } = useAccount();
  const accountData = account.data;
  const { eoa } = router.query;

  const breadcrumbs = [
    {
      text: "NFT Collection",
      href: `/nft/eoa/${eoa}?page=1`,
    },
    {
      text: "NFT Transfers",
      href: `/nft/eoa/${eoa}/transfers?page=1`,
    },
  ];

  return (
    <>
      <div className="w-72 ml-auto mr-2">
        <AccountSearch />
      </div>
      <div className="text-center text-3xl font-semibold font-mono text-gray-700 break-words">
        {accountData == eoa ? (
          <div className="font-extrabold">My NFT {title}</div>
        ) : (
          <div>
            Viewing {title} for{"  "}
            <div className="break-all mt-2 font-extrabold">{eoa}</div>
          </div>
        )}
      </div>

      <div className="mt-10 ml-auto text-lg font-mono text-blue-500">
        <Breadcrumbs items={breadcrumbs} />
      </div>
    </>
  );
};

export default AssetsHeader;
