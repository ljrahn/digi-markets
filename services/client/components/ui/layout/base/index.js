import { InteractiveDemoProvider } from "@components/hooks/interactiveDemo";
import { Web3Provider } from "@components/providers";
import { ServerProvider } from "@components/providers";
import { Navbar, Footer } from "@components/ui/common";
import { Sidebar } from "@components/ui/common";
import { useState } from "react";

export default function BaseLayout({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <InteractiveDemoProvider>
      <Web3Provider>
        <ServerProvider>
          <Navbar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
          <Sidebar showSidebar={showSidebar} />
          <div className="max-w-7xl mx-auto px-5 md:px-20 sm:px-10">
            <div className="fit">{children}</div>
          </div>
          <Footer />
        </ServerProvider>
      </Web3Provider>
    </InteractiveDemoProvider>
  );
}
