import React from "react";
import { TiClipboard } from "react-icons/ti";
import ReactTooltip from "react-tooltip";

const CopyClipboard = ({
  place = "bottom",
  children,
  copyText = "",
  iconSize = 20,
}) => {
  return (
    <>
      <div
        data-tip="Copied to Clipboard"
        data-for={copyText}
        className="flex justify-center items-center cursor-pointer"
      >
        {children}
        <TiClipboard color="white" size={iconSize} className="flex-none" />
      </div>

      <ReactTooltip
        event="click"
        eventOff="click"
        delayHide={1500}
        afterShow={() => navigator.clipboard.writeText(copyText)}
        effect="solid"
        place={place}
        id={copyText}
      />
    </>
  );
};

export default CopyClipboard;
