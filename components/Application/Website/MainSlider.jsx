"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import slider1 from "@/public/assets/images/slider-1.png";
import slider2 from "@/public/assets/images/slider-2.png";
import slider3 from "@/public/assets/images/slider-3.png";
import slider4 from "@/public/assets/images/slider-4.png";
import Image from "next/image";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const ArrowNext = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-14 h-14 flex justify-center items-center rounded-full absolute z-10 top-1/2 -translate-y-1/2 bg-white right-10
      max-[530px]:hidden" // hide button on mobile
    >
      <LuChevronRight size={25} className="text-gray-600" />
    </button>
  );
};

const ArrowPrev = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-14 h-14 flex justify-center items-center rounded-full absolute z-10 top-1/2 -translate-y-1/2 bg-white left-10
      max-[530px]:hidden" // hide button on mobile
    >
      <LuChevronLeft size={25} className="text-gray-600" />
    </button>
  );
};

const MainSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    nextArrow: <ArrowNext />,
    prevArrow: <ArrowPrev />,
    responsive: [
      {
        breakpoint: 530,
        settings: {
          dots: false,
          arrows: false, // correct property name
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings}>
        {[slider1, slider2, slider3, slider4].map((img, i) => (
          <div key={i}>
            <Image
              src={img.src}
              width={img.width}
              height={img.height}
              alt={`slider ${i + 1}`}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MainSlider;
