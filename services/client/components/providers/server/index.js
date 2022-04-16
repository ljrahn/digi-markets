import { createContext, useContext, useState } from "react";
import { setupHooks } from "./hooks/setupHooks";

const ServerContext = createContext(null);

const createServerState = () => ({
  hooks: setupHooks(),
});

export default function ServerProvider({ children }) {
  const [serverApi, setServerApi] = useState(createServerState());

  return (
    <ServerContext.Provider value={serverApi}>
      {children}
    </ServerContext.Provider>
  );
}

export const useServer = () => {
  return useContext(ServerContext);
};

export const useHooks = (callback) => {
  const { hooks } = useServer();
  return callback(hooks);
};
