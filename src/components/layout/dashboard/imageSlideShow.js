import React from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import Image from "next/image";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiArrowLeft } from "react-icons/fi";
import Share from "assets/icons/dashboard/share.svg";
import ListingStore from "store/listing";
import { NextArrow, PrevArrow } from "components/general/slider/carouselArrows";

const ImageSlideShow = ({ listing, closeSlideShow }) => {
  const { setShowShareModal } = ListingStore;
  const settings = {
    className: "center flex items-center pt-0",
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    infinite: true,
    slidesToScroll: 1,
    adaptiveHeight: true,

    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    responsive: [
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="fixed w-full h-full top-0 left-0 z-[100] grid place-content-center bg-black/[.8]">
      <div className="overlay w-screen h-screen inset-0 fixed bg-black/[.1] "></div>

      <div className="flex justify-between text-white absolute py-6 w-full px-10">
        <p
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => closeSlideShow()}
        >
          <FiArrowLeft size={20} /> <span className="underline">Back</span>
        </p>

        <div className="flex gap-4">
          {/* <p className="flex gap-1 items-center">
            <Like width={20} height={20} className="-mb-1.5" />{" "}
            <span className="text-red-400">Liked</span>
          </p> */}
          <a
            href="#share-listing"
            onClick={() => setShowShareModal(true)}
            className="flex gap-2 items-center white-path-stroke"
          >
            <Share width={20} height={20} className="opacity-80" />{" "}
            <span className="underline">Share</span>
          </a>
        </div>
      </div>

      <div className="fixed top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4  w-[600px] md:w-[800px] max-h-[500px] xs:max-w-[calc(100%_-_80px)] max-w-[calc(100%_-_50px)]  z-[41]">
        <Slider className="flex items-center h-full" {...settings}>
          {listing?.images?.map((image, i) => (
            <div
              className="w-[20rem] h-[400px] md:h-[550px] max-h-[400px]  md:max-h-[550px] max-w-[100%] relative"
              key={image}
            >
              <div className="w-full h-[90%]">
                <Image
                  className="object-cover mx-auto"
                  src={image}
                  alt="space view"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p className="text-[#8B8E93] text-center mt-6">
                &#x2022; Space view {i + 1}
              </p>
            </div>
          ))}
          {listing?.sitting_space_images?.map((image, i) => (
            <div
              className="w-[20rem] h-[400px] md:h-[550px] max-h-[400px]  md:max-h-[550px] max-w-[100%] relative"
              key={image}
            >
              <div className="w-full h-[90%]">
                <Image
                  className="object-cover mx-auto"
                  src={image}
                  alt="sitting space"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p className="text-[#8B8E93] text-center mt-6">
                &#x2022; Sitting space view {i + 1}
              </p>
            </div>
          ))}
          {listing?.kitchen_images?.map((image, i) => (
            <div
              className="w-[20rem] h-[400px] md:h-[550px] max-h-[400px]  md:max-h-[550px] max-w-[100%] relative"
              key={image}
            >
              <div className="w-full h-[90%]">
                <Image
                  className="object-cover mx-auto"
                  src={image}
                  alt="kitchen view"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p className="text-[#8B8E93] text-center mt-6">
                &#x2022; Kitchen view {i + 1}
              </p>
            </div>
          ))}
          {listing?.bedroom_images?.map((image, i) => (
            <div
              className="w-[20rem] h-[400px] md:h-[550px] max-h-[400px]  md:max-h-[550px] max-w-[100%] relative"
              key={image}
            >
              <div className="w-full h-[90%]">
                <Image
                  className="object-cover mx-auto"
                  src={image}
                  alt="bedroom view"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p className="text-[#8B8E93] text-center mt-6">
                &#x2022; Bedroom view {i + 1}
              </p>
            </div>
          ))}

          {listing?.bathroom_images?.map((image, i) => (
            <div
              className="w-[20rem] h-[400px] md:h-[550px] max-h-[400px]  md:max-h-[550px] max-w-[100%] relative"
              key={image}
            >
              <div className="w-full h-[90%]">
                <Image
                  className="object-cover mx-auto"
                  src={image}
                  alt="bathroom view"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p className="text-[#8B8E93] text-center mt-6">
                &#x2022; Bathroom view {i + 1}
              </p>
            </div>
          ))}

          {listing?.dining_area_images?.map((image, i) => (
            <div
              className="w-[20rem] h-[400px] md:h-[550px] max-h-[400px]  md:max-h-[550px] max-w-[100%] relative"
              key={image}
            >
              <div className="w-full h-[90%]">
                <Image
                  className="object-cover mx-auto"
                  src={image}
                  alt="dining area"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p className="text-[#8B8E93] text-center mt-6">
                &#x2022; Dining area view {i + 1}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

ImageSlideShow.propTypes = {
  listing: PropTypes.object,
  closeSlideShow: PropTypes.func,
};

export default ImageSlideShow;
