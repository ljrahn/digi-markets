import Router, { useRouter } from "next/router";
import React from "react";
import { CgArrowRight, CgArrowLeft } from "react-icons/cg";
import { useEffect } from "react";

const Pagination = ({
  total,
  page,
  numResults,
  pageSize,
  color = "dark",
  scroll = true,
}) => {
  const router = useRouter();
  const lowerLimit = (page - 1) * pageSize + 1;
  const upperLimit = lowerLimit + numResults - 1;

  useEffect(() => {
    // If page number is manually specified, and results dont exist for that page, redirect to page 1
    if (numResults <= 0 || page <= 0) {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, page: 1 },
        },
        undefined,
        { scroll: scroll }
      );
    }
  }, []);

  const onClick = (direction) => {
    const page = null;
    const current_page = router.query.page;
    if (direction == "next") {
      page = parseInt(current_page) + 1;
    } else if (direction == "prev") {
      page = parseInt(current_page) - 1;
    }
    page = !page && !(page <= 0) ? 2 : page; // if page not specified redirect to page 2

    // Disable prev if page is going to be equal to 0
    // Disable next if the upper limit is equal to or greater than total
    if (!(page <= 0) && !(upperLimit >= total && direction == "next")) {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, page: page },
        },
        undefined,
        { scroll: scroll }
      );
    }
  };

  return (
    <>
      {total != 0 && (
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
              {total.toLocaleString()}
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
