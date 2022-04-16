import useInteractiveDemo from "@components/hooks/interactiveDemo";
import { Button } from "@components/ui/common";
import React from "react";

const InteractiveDemoStart = () => {
  const { startDemo, demoStarted, endDemo } = useInteractiveDemo();

  const onClick = () => {
    !demoStarted ? startDemo() : endDemo();
  };

  return (
    <Button variant="blue" onClick={onClick}>
      {!demoStarted ? <span>Start</span> : <span>End</span>} {"  "}
      Demo
    </Button>
  );
};

export default InteractiveDemoStart;
