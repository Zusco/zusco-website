import React from "react";
import { observer } from "mobx-react-lite";
import { CgArrowLongRight } from "react-icons/cg";

const instructions = observer(() => {
  return (
    <section className="flex flex-col gap-14">
      <div className="w-[60%]  mmd:w-[80%] flex flex-col gap-6 pl-[10%]">
        <h4 className="text-blue-sky medium-font text-[15px]  mmd:text-[12px]">
          HOW IT WORKS
        </h4>
        <h2 className="text-blue-sky font-bold text-[40px]   mlgtext-[32px]  mmd:text-[24px]">
          Get started on Zusco with these easy steps
        </h2>
        <p className="text-[22px]   mlgtext-[18px]  mmd:text-[14px]">
          Browse our locations. Leave it to Zusco to help support your
          short-stay needs.
        </p>
      </div>

      <div className="grid grid-cols-[1fr,_1fr]  mmd:grid-cols-[1fr] gap-6 justify-between ">
        <div></div>
        <div className="flex flex-col justify-between py-6 px-[32px] pl-[15%]  mmd:pl-[10%]">
          <div className=""></div>
          <h2 className="text-blue-sky font-bold text-[32px]   mlgtext-[26px]  mmd:text-[32px]  mxs:text-[26px]">
            Rent a shortlet.
          </h2>
          <p className="text-[18px]   mlgtext-[14px]  mxs:text-[14px]  mmd:text-[18px] text-black w-[70%]  mmd:w-full">
            Choose from a wide range of short let properties to rent, in a
            variety of locations across the country. Your comfort matters.
          </p>
          <div className="flex gap-3 items-center">
            <p className="underline text-blue-sky text-[18px]   mlgtext-[14px]">
              Find out how{" "}
            </p>
            <span>
              <CgArrowLongRight className="text-blue-sky" color="#00509D" />
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr,_1fr]  mmd:grid-cols-[1fr] gap-6 justify-between  ">
        <div className="flex flex-col justify-between py-6 pl-[10%] ">
          <div></div>
          <h2 className="text-blue-sky font-bold text-[32px]   mlgtext-[26px] ">
            Become a host
          </h2>
          <p className="text-[18px]   mlgtext-[14px] text-black w-[80%]">
            Zusco helps you, as a homeowner, to rent or lease out your spare
            rooms, so that you can earn more with little to no hassle!
          </p>
          <div className="flex gap-3 items-center">
            <p className="underline text-blue-sky text-[18px]   mlgtext-[14px]">
              Find out how{" "}
            </p>
            <span>
              <CgArrowLongRight className="text-blue-sky" color="#00509D" />
            </span>
          </div>
        </div>
        <div className="pl-[10%]  mmd:pl-[1px]"></div>
      </div>
    </section>
  );
});

export default instructions;
