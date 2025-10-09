import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

const FeaturedProduct = () => {
  const { data: productData } = axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/get-featured-product`
  );

  return (
    <section className="lg:px-32 px-4 sm:py-10">
      <div className="flex justify-between items-center mb-5">
        <h2 className="sm:text-4xl text-2xl font-semibold">
          Featured Products
        </h2>
        <Link
          href={""}
          className="flex items-center gap-2 underline underline-offset-4 hover:text-primary"
        >
          View All
          <IoIosArrowRoundForward />
        </Link>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-2 sm:gap-10 gap-2"></div>
    </section>
  );
};

export default FeaturedProduct;
