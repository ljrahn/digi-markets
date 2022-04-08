import Router, { useRouter } from "next/router";
import React from "react";
import { CgArrowRight, CgArrowLeft } from "react-icons/cg";

const Pagination = ({ total, page, numResults, pageSize }) => {
  const router = useRouter();
  const lowerLimit = (page - 1) * pageSize + 1;
  const upperLimit = lowerLimit + numResults - 1;

  const onClick = (direction) => {
    const pathname = router.asPath.split("?")[0];
    const page = null;
    const current_page = router.query.page;
    if (direction == "next") {
      page = parseInt(current_page) + 1;
    } else if (direction == "prev") {
      page = parseInt(current_page) - 1;
    }
    page = !page && !(page <= 0) ? 2 : page; // if page not specified redirect to page 2

    if (!(page <= 0)) {
      router.push({
        pathname: pathname,
        query: {
          page: page,
        },
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <span className="text-md text-gray-700 mb-2">
        Showing <span className="font-bold text-gray-600">{lowerLimit}</span> to{" "}
        <span className="font-bold text-gray-600">{upperLimit}</span> of{" "}
        <span className="font-bold text-gray-600">
          {total.toLocaleString()}
        </span>{" "}
        Entries
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        <button
          onClick={() => onClick("prev")}
          className="inline-flex items-center py-3 px-4 text-md font-medium rounded-l bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
        >
          <CgArrowLeft size={25} />
          Prev
        </button>
        <button
          onClick={() => onClick("next")}
          className="inline-flex items-center py-3 px-4 text-md font-medium rounded-r border-0 border-l bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
        >
          Next
          <CgArrowRight size={25} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
