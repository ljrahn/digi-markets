import React from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useRouter } from "next/router";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="text-md inline-flex items-center px-3 py-2 rounded-lg bg-gray-700 text-gray-300 mt-2"
    >
      <TiArrowBackOutline size={17} className="mr-1" />
      Back
    </button>
  );
};

export default BackButton;
