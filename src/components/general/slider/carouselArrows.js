import React from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={`ml-8`} onClick={onClick}>
      <AiOutlineRight
        color={"#ffffff"}
        className="border rounded-full p-3"
        size={60}
      />
    </div>
  );
};

export const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={`mr-8`} onClick={onClick}>
      <AiOutlineLeft
        color={"#ffffff"}
        className="border rounded-full p-3"
        size={60}
      />
    </div>
  );
};
