"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { IoStar } from "react-icons/io5";
import { BsChatQuote } from "react-icons/bs";

const testimonials = [
  {
    name: "Aarav Mehta",
    review:
      "I have been using this service for a few months now, and I must say it has exceeded my expectations. The interface is clean and easy to navigate. Customer support is also quick to respond and very professional.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    review:
      "The quality of work delivered was truly impressive. Every small detail was taken care of, and the communication throughout the process was excellent. I would definitely recommend it to others looking for reliable service.",
    rating: 4.8,
  },
  {
    name: "Rohan Patel",
    review:
      "At first, I was skeptical, but after trying it, I’m completely satisfied. The team understands user needs very well and implements feedback quickly. It has genuinely made my workflow smoother and more efficient.",
    rating: 4.7,
  },
  {
    name: "Sneha Iyer",
    review:
      "This platform provides exceptional value for money. The performance is stable, and I haven’t faced any major issues so far. I also appreciate the regular updates and new feature additions that keep improving the experience.",
    rating: 4.9,
  },
  {
    name: "Vikram Joshi",
    review:
      "I’ve tried several similar platforms before, but none come close to this one. The user interface is intuitive, and everything feels well thought out. I’ve already recommended it to a few colleagues and they love it too.",
    rating: 5,
  },
  {
    name: "Neha Kapoor",
    review:
      "Excellent service and very user-friendly experience. The design and performance both stand out, making it enjoyable to use. I’m particularly impressed by how seamlessly everything integrates with my existing tools.",
    rating: 4.6,
  },
  {
    name: "Arjun Nair",
    review:
      "The best thing about this product is consistency. It delivers every single time without fail. I’ve had a few questions, and the support team always resolves them promptly. It’s definitely worth the investment.",
    rating: 4.8,
  },
  {
    name: "Kavita Deshmukh",
    review:
      "It’s rare to find such a well-built solution that combines usability, aesthetics, and functionality. The setup was super simple, and I was able to get started in no time. I truly appreciate the attention to detail.",
    rating: 4.9,
  },
  {
    name: "Rahul Verma",
    review:
      "From the moment I started using it, I knew this was something special. The updates are frequent, and the developers clearly listen to user feedback. It’s refreshing to see such dedication and professionalism.",
    rating: 5,
  },
  {
    name: "Tanvi Reddy",
    review:
      "This service has helped me save both time and effort. The automation features work flawlessly, and the interface is elegant yet powerful. I’m genuinely happy with my experience and look forward to future updates.",
    rating: 4.7,
  },
];

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div className="lg:px-32 px-4 sm:pt-20 pt-5 pb-10">
      <h2 className="text-center sm:text-4xl text-2xl mb-5 font-semibold">
        Customer Review
      </h2>
      <Slider {...settings}>
        {testimonials.map((item, index) => (
          <div key={index} className="p-5">
            <div className="border rounded-lg p-5">
              <BsChatQuote size={30} className="mb-3" />
              <p className="mb-5">{item.review}</p>
              <h4 className="font-semibold">{item.name}</h4>
              <div className="flex mt-1">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <IoStar
                    key={`star${i}`}
                    className="text-yellow-400"
                    size={20}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonial;
