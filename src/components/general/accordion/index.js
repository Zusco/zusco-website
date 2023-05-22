import React, { useRef } from "react";
import { FiChevronRight } from "react-icons/fi";

const Accordion = ({ data, isCollapsed, onClick }) => {
  const { question, answer } = data;
  const ref = useRef(null);
  return (
    <div
      onClick={onClick}
      className="flex flex-col justify-start items-start w-full transition-all duration-[300ms] ease cursor-pointer "
    >
      <div
        className={`flex justify-between items-start w-full py-[12px] z-[2] ${
          isCollapsed
            ? "border-b-[0.4px] border-grey-border"
            : "border-b border-blue"
        } border-solid`}
      >
        <p className="break-words text-left w-full max-w-[430px] text-black font-light txt-heading-alt">
          {question}
        </p>
        <button
          className={`${
            !isCollapsed && "-rotate-90"
          } transition-all duration-[300ms] ease`}
        >
          <FiChevronRight />
        </button>
      </div>

      <div
        style={{
          maxHeight: isCollapsed ? "0px" : `${ref?.current?.scrollHeight}px`,
        }}
        ref={ref}
        className={`${
          isCollapsed ? "opacity-0 z-[-1]" : "leading-normal z-[3]"
        } bg-white py-2 transition-[max-height] duration-[300ms] ease cursor-pointer `}
      >
        <p className="break-words text-left max-w-[100%] text-black font-light text-[13px] sm:text-lg max-h-[inherit] z-[99] bg-white">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default Accordion;
