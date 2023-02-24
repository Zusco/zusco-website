import React from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import Image from "next/image";
import { AiOutlineVerticalLeft } from "react-icons/ai";
import { AiOutlineVerticalRight } from "react-icons/ai";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageCarousel = ({ listing, slideClick }) => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    lazyLoad: true,
    centerPadding: "20px",
    slidesToShow: 4,
    speed: 500,
    infinite: true,
    slidesToScroll: 1,

    nextArrow: <AiOutlineVerticalLeft color={"#8B8E93"} size={70} />,
    prevArrow: <AiOutlineVerticalRight color={"#8B8E93"} size={70} />,

    responsive: [
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-[96%] h-[200px] pl-[20px]">
      <Slider className="flex" {...settings}>
        {listing?.images?.map((image, i) => (
          <div onClick={slideClick} className="w-[20rem] " key={image}>
            <div className="h-[180px] w-[95%] relative">
              <Image src={image} alt="space" fill className="object-cover" />
            </div>
            <p className="pl-[5%] text-[#8B8E93] ">
              &#x2022; space view {i + 1}
            </p>
          </div>
        ))}
        {listing?.sitting_space_images?.map((image, i) => (
          <div onClick={slideClick} className="w-[20rem]" key={image}>
            <div className="h-[180px] w-[95%] relative">
              <Image src={image} alt="sitting space" fill />
            </div>
            <p className="pl-[5%] text-[#8B8E93] ">
              &#x2022; sitting space view {i + 1}
            </p>
          </div>
        ))}
        {listing?.kitchen_images?.map((image, i) => (
          <div onClick={slideClick} className="w-[20rem]" key={image}>
            <div className="h-[180px] w-[95%] relative">
              <Image src={image} alt="kitchen view" fill />
            </div>
            <p className="pl-[5%] text-[#8B8E93] ">
              &#x2022; kitchen view {i + 1}
            </p>
          </div>
        ))}
        {listing?.bedroom_images?.map((image, i) => (
          <div onClick={slideClick} className="w-[20rem]" key={image}>
            <div className="h-[180px] w-[95%] relative">
              <Image src={image} alt="bedroom view" fill />
            </div>
            <p className="pl-[5%] text-[#8B8E93] ">
              &#x2022; bedroom view {i + 1}
            </p>
          </div>
        ))}

        {listing?.bathroom_images?.map((image, i) => (
          <div onClick={slideClick} className="w-[20rem]" key={image}>
            <div className="h-[180px] w-[95%] relative">
              <Image src={image} alt="bathroom view" fill />
            </div>
            <p className="pl-[5%] text-[#8B8E93] ">
              &#x2022; bathroom view {i + 1}
            </p>
          </div>
        ))}

        {listing?.dining_area_images?.map((image, i) => (
          <div onClick={slideClick} className="w-[20rem]" key={image}>
            <div className="h-[180px] w-[95%] relative">
              <Image src={image} alt="dining area" fill />
            </div>
            <p className="pl-[5%] text-[#8B8E93] ">
              &#x2022; dining area view {i + 1}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

ImageCarousel.propTypes = {
  listing: PropTypes.object,
  slideClick: PropTypes.func,
};

export default ImageCarousel;
