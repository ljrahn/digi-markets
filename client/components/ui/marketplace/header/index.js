import { useAccount } from "@components/hooks/web3";
import { Breadcrumbs } from "@components/ui/common";
import { EthRates } from "@components/ui/web3";

const LINKS = [
  {
    href: "/marketplace",
    text: "Buy",
  },
  {
    href: "/marketplace/collection/owned",
    text: "My Collection",
  },
];

export default function MarketplaceHeader() {
  const { account } = useAccount();

  return (
    <>
      <EthRates />
      <div className="flex flex-row-reverse p-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={LINKS} isAdmin={account.isAdmin} />
      </div>
    </>
  );
}
