import Link from "next/link";
import React from "react";
import { BiLinkAlt, BiLinkExternal } from "react-icons/bi";

const RedirectUrl = ({
  href,
  children,
  iconSize = 15,
  className = "",
  internal = false,
}) => {
  return (
    <Link href={href}>
      <a target={!internal ? "_blank" : ""}>
        <div
          className={`flex justify-center items-center cursor-pointer ${className}`}
        >
          {children}
          {!internal ? (
            <BiLinkExternal size={iconSize} className="flex-none" />
          ) : (
            <BiLinkAlt size={iconSize} className="flex-none" />
          )}
        </div>
      </a>
    </Link>
  );
};

export default RedirectUrl;
