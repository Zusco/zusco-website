import Accordion from "components/general/accordion";
import React, { useState } from "react";
import { FAQS } from "utils/constants";

const Faqs = () => {
  const [activeItem, setActiveItem] = useState(FAQS[0]?.question);

  return (
    <div className="flex flex-col justify-start items-center w-full px-6 sm:px-10 md:px-[4rem] lg:px-[6rem]">
      <h2 className="flex gap-[1.5rem] text-[2rem] mmd:text-[1.2rem] regular-font text-black">
        Common Questions
      </h2>

      <div className="flex flex-col justify-center items-start text-left md:basis-[50%] w-full h-fit relative">
        {FAQS.map((item, i) => (
          <Accordion
            key={i}
            data={item}
            isCollapsed={item.question !== activeItem}
            onClick={() =>
              setActiveItem((prev) =>
                prev === item.question ? "" : item.question
              )
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Faqs;
