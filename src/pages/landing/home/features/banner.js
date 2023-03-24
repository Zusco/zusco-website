import React, { useState } from "react";
import { observer } from "mobx-react-lite";

import { images } from "utils/images";
import SearchBar from "components/layout/landing/searchBar";
import BannerImage from "../../../../../public/banner-image.png";
import Image from "next/image";
const Banner = observer(() => {
  const { Scroll, AppStore, GoogleStore } = images;
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="bg_image flex flex-col justify-between">
      <div className="h-full w-full pt-8  md:pt-[54px]">
        <div className="flex flex-col md:flex-row pl-0 md:pl-[42px] lg:pl-[62px] xl:pl-[72px]">
          <div className="flex flex-col justify-start items-between md:items-start text-center md:pl-0 md:pr-10 md:text-left md:w-[55%] lg:w-[45%] w-full h-full z-[5] !ml-0 !mt-0 space-y-12">
            <div className="items-center flex flex-col gap-4  md:gap-8 px-6 sm:px-0">
              <h2 className="text-black  regular-font zusco-heading">
                Your online marketplace for short-let homes. Nextjs
              </h2>
              <p className="zusco-title text-gray-500 regular-font">
                Forget multiyear leases, tacky decor and constant moving. Zusco
                offers an easy, flexible option with no long term commitment!
              </p>
              <div className="w-full">
                <SearchBar />
              </div>
            </div>

            <div className="flex md:hidden pb-2 sm:py-8">
              <Image
                src={BannerImage}
                className="w-full object-cover object-center h-[200px] min-h-[200px] sm:h-[300px] sm:min-h-[200px] scale-125"
                alt="banner"
              />
            </div>
            <div className="flex justify-between sm:justify-start gap-6 mmd:gap-3  mlg:pt-4 w-full -mt-28">
              <GoogleStore className="msm:w-[50%] mxs:w-[70%]" />
              <AppStore className="msm:w-[50%] mxs:w-[70%]" />
            </div>
            <div className="w-full flex justify-center sm:justify-start">
              <Scroll />
            </div>
            <div className=" mmd:w-screen mmd:px-4 msm:px-2 hidden mmd:block z-[10]">
              <SearchBar
                value={searchQuery}
                onChangeFunc={(val) => {
                  setSearchQuery(val);
                }}
              />
            </div>
          </div>
          <div className="hidden md:flex flex-col justify-center items-center md:items-end md:w-[45%] lg:w-[55%] w-full h-full relative z-[5]">
            <div className="flex justify-end items-center w-full md:w-[95%] lg:w-[100%] xl:w-full">
              <Image
                src={BannerImage}
                className="h-full w-fit z-[5]"
                alt="banner"
              />
            </div>

            <Image
              src="https://res.cloudinary.com/olamilekan1/image/upload/v1675651030/bgBorder.svg"
              className="h-full absolute md:right-[6rem] lg:right-[7.5rem] z-[4]"
              alt="banner"
              fill
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Banner;
