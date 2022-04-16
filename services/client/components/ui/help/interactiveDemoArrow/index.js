import useInteractiveDemo from "@components/hooks/interactiveDemo";
import React from "react";
import { ImArrowUpRight, ImArrowRight, ImArrowUp } from "react-icons/im";
import { animated, config, useSpring } from "react-spring";

const InteractiveDemoArrow = ({ direction = "up-right", className }) => {
  const { demoStarted, step } = useInteractiveDemo();

  const upRightAnimation = useSpring({
    from: {
      x: "-30px",
      y: "30px",
    },
    to: {
      x: "0px",
      y: "0px",
    },
    loop: true,
    config: config.molasses,
  });

  const upAnimation = useSpring({
    from: {
      x: "0px",
      y: "30px",
    },
    to: {
      x: "0px",
      y: "0px",
    },
    loop: true,
    config: config.molasses,
  });

  const rightAnimation = useSpring({
    from: {
      x: "-30px",
      y: "0",
    },
    to: {
      x: "0px",
      y: "0px",
    },
    loop: true,
    config: config.molasses,
  });

  return (
    <>
      {demoStarted ? (
        <>
          {direction == "up-right" && (
            <animated.div
              style={upRightAnimation}
              className={`absolute z-50 ${className}`}
            >
              <ImArrowUpRight className="text-blue-500" size={30} />
            </animated.div>
          )}
          {direction == "right" && (
            <animated.div
              style={rightAnimation}
              className={`absolute z-50 ${className}`}
            >
              <ImArrowRight className="text-blue-500" size={30} />
            </animated.div>
          )}
          {direction == "up" && (
            <animated.div
              style={upAnimation}
              className={`absolute z-50 ${className}`}
            >
              <ImArrowUp className="text-blue-500" size={30} />
            </animated.div>
          )}
        </>
      ) : null}
    </>
  );
};

export default InteractiveDemoArrow;
