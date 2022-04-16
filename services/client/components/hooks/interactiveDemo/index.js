import { createContext, useContext, useState } from "react";

const InteractiveDemoContext = createContext(null);

export const InteractiveDemoProvider = ({ children }) => {
  const [state, setState] = useState({
    step: 1,
    demoStarted: false,
  });

  const increaseStep = () => {
    setState({
      ...state,
      step: state.step + 1,
    });
  };

  const startDemo = () => {
    setState({
      ...state,
      step: 1,
      demoStarted: true,
    });
  };

  const endDemo = () => {
    setState({
      ...state,
      step: 1,
      demoStarted: false,
    });
  };

  return (
    <InteractiveDemoContext.Provider
      value={{
        step: state.step,
        demoStarted: state.demoStarted,
        increaseStep,
        startDemo,
        endDemo,
      }}
    >
      {children}
    </InteractiveDemoContext.Provider>
  );
};

const useInteractiveDemo = () => {
  return useContext(InteractiveDemoContext);
};

export default useInteractiveDemo;
