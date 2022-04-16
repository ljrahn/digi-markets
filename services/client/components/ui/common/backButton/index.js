import React from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import { useRouter } from "next/router";
import Button from "../button";

const BackButton = ({ onClick }) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <Button
      onClick={!onClick ? goBack : onClick}
      variant="blue"
      className="text-md inline-flex items-center !px-4 mt-2"
    >
      <TiArrowBackOutline size={17} className="mr-1" />
      Back
    </Button>
  );
};

export default BackButton;
