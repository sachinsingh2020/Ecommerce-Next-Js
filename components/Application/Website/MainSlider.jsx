"use client";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import slider1 from "@/public/assets/images/slider-1.png";
import slider2 from "@/public/assets/images/slider-2.png";
import slider3 from "@/public/assets/images/slider-3.png";
import slider4 from "@/public/assets/images/slider-4.png";
import Image from "next/image";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const ArrowNext = ({ onClick }) => (
  <button
    onClick={onClick}
    type="button"
    className="w-14 h-14 flex justify-center items-center rounded-full absolute z-10 top-1/2 -translate-y-1/2 bg-white right-10 shadow-lg">
    <LuChevronRight size={25} className="text-gray-600" />
  </button>
);

const ArrowPrev = ({ onClick }) => (
  <button
    onClick={onClick}
    type="button"
    className="w-14 h-14 flex justify-center items-center rounded-full absolute z-10 top-1/2 -translate-y-1/2 bg-white left-10 shadow-lg">
    <LuChevronLeft size={25} className="text-gray-600" />
  </button>
);

const MainSlider = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size dynamically
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 530);
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: !isMobile,
    infinite: true,
    speed: 500,
    autoplay: true,
    arrows: !isMobile,
    nextArrow: !isMobile ? <ArrowNext /> : null,
    prevArrow: !isMobile ? <ArrowPrev /> : null,
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
