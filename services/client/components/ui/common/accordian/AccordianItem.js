import React from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";

const toTitleCase = (text) => {
  const result = text.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const AccordianItem = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  const key = Object.keys(item)[0];
  const heading = toTitleCase(key);
  const body = item[key];

  return (
    <>
      <h2>
        <button
          type="button"
          className={`flex justify-center items-center p-5 w-full font-medium text-center ${
            index == 0 ? "rounded-t-xl" : ""
          } bg-gray-800 focus:ring-2 ring-gray-900 text-gray-400 hover:bg-gray-900`}
          onClick={() => setOpen(!open)}
        >
          <div className="ml-auto">{heading}</div>
          <div className="ml-auto">
            {open ? (
              <MdKeyboardArrowUp size={25} />
            ) : (
              <MdKeyboardArrowDown size={25} />
            )}
          </div>
        </button>
      </h2>
      <div
        id={`accordion-collapse-body-${index}`}
        className={`${open ? "" : "hidden"}`}
      >
        <div className="p-5 border mb-2 text-gray-400 border-b-0 border-gray-700 bg-gray-900">
          {body}
        </div>
      </div>
    </>
  );
};

export default AccordianItem;
