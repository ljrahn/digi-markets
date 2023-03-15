import Router, { useRouter } from "next/router";
import React from "react";
import { CgArrowRight, CgArrowLeft } from "react-icons/cg";
import { useEffect } from "react";
import { useState } from "react";

const Pagination = ({ data, cursors, setCursors, setPage, color = "dark" }) => {
  const lowerLimit = (data.page - 1) * data.page_size + 1;
  const upperLimit = lowerLimit + data.num_results - 1;

  const onClick = (direction) => {
    if (direction == "next" && !(upperLimit >= data.total)) {
      const newPage = data.page + 1;
      if (newPage > cursors.length && data.cursor != null) {
        setCursors([...cursors, data.cursor]);
      }

      if (data.cursor != null) {
        setPage(newPage);
      }
    } else if (direction == "prev") {
      const newPage = data.page - 1;

      if (!(newPage <= 0)) {
        setPage(newPage);
      }
    }
  };

  return (
    <>
      {data.total != 0 && (
        <div className="flex flex-col items-center">
          <span
            className={`text-md ${
              color == "dark" ? "text-gray-700" : "text-gray-200"
            } mb-2`}
          >
            Showing{" "}
            <span
              className={`font-extrabold ${
                color == "dark" ? "text-gray-600" : "text-gray-100"
              }`}
            >
              {lowerLimit}
            </span>{" "}
            to{" "}
            <span
              className={`font-extrabold ${
                color == "dark" ? "text-gray-600" : "text-gray-100"
              }`}
            >
              {upperLimit}
            </span>{" "}
            of{" "}
            <span
              className={`font-extrabold ${
                color == "dark" ? "text-gray-600" : "text-gray-100"
              }`}
            >
              {data.total.toLocaleString()}
            </span>{" "}
            Entries
          </span>
          <div className="inline-flex mt-2 xs:mt-0">
            <button
              onClick={() => onClick("prev")}
              className={`inline-flex items-center py-3 px-4 text-md font-medium rounded-l bg-gray-800 border-gray-700 text-gray-400 hover:text-white ${
                color == "dark" ? "hover:bg-gray-700" : "hover:bg-gray-900"
              }`}
            >
              <CgArrowLeft size={25} />
              Prev
            </button>
            <button
              onClick={() => onClick("next")}
              className={`inline-flex items-center py-3 px-4 text-md font-medium rounded-r border-0 border-l bg-gray-800 border-gray-700 text-gray-400 hover:text-white ${
                color == "dark" ? "hover:bg-gray-700" : "hover:bg-gray-900"
              }`}
            >
              Next
              <CgArrowRight size={25} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Pagination;
