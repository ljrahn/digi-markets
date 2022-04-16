import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";

const BreadcrumbItem = ({ item, index }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`${index === 0 ? "pr-4" : "px-4"} font-medium 
     ${
       mounted && window.location.pathname == item.href.split("?")[0]
         ? "text-blue-500 hover:text-blue-700"
         : "text-gray-500 hover:text-gray-700"
     }
      `}
    >
      <Link href={item.href}>
        <a>{item.text}</a>
      </Link>
    </div>
  );
};

export default function Breadcrumbs({ items }) {
  return (
    <div className="flex leading-none divide-x-2 divide-gray-400">
      {items.map((item, index) => (
        <BreadcrumbItem key={index} item={item} index={index} />
      ))}
    </div>
  );
}
