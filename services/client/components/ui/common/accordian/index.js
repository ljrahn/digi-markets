import React from "react";
import { useEffect } from "react";
import AccordianItem from "./AccordianItem";

const Accordian = ({ data }) => {
  useEffect(() => {}, [data]);

  return (
    <div id="accordion-collapse" data-accordion="collapse">
      {data &&
        data.map((item, index) => (
          <AccordianItem key={index} item={item} index={index} />
        ))}
    </div>
  );
};

export default Accordian;
