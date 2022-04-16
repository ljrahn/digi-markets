import { Button, Hero } from "@components/ui/common";
import { PopularCollections } from "@components/ui/common";
import { BaseLayout } from "@components/ui/layout";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="mb-20">
        <PopularCollections />
      </div>
    </div>
  );
}

Home.Layout = BaseLayout;
