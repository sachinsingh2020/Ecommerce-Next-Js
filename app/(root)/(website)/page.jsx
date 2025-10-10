import FeaturedProduct from "@/components/Application/Website/FeaturedProduct";
import MainSlider from "@/components/Application/Website/MainSlider";
import banner1 from "@/public/assets/images/banner1.png";
import banner2 from "@/public/assets/images/banner2.png";
import Image from "next/image";
import Link from "next/link";
import advertisingBanner from "@/public/assets/images/advertising-banner.png";
import Testimonial from "@/components/Application/Website/Testimonial";
import { GiReturnArrow } from "react-icons/gi";
import { FaShippingFast } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { TbRosetteDiscountFilled } from "react-icons/tb";

export default function Home() {
  return (
    <>
      <section>
        <MainSlider />
      </section>
      <section className="lg:px-32 px-4 sm:pt-20 pt-5 pb-10">
        <div className="grid grid-cols-2 sm:gap-10 gap-2">
          <div className="border rounded-lg overflow-hidden">
            <Link href={""}>
              <Image
                className="transition-all hover:scale-110"
                src={banner1.src}
                width={banner1.width}
                height={banner1.height}
                alt="banner 1"
              />
            </Link>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <Link href={""}>
              <Image
                className="transition-all hover:scale-110"
                src={banner2.src}
                width={banner2.width}
                height={banner2.height}
                alt="banner 2"
              />
            </Link>
          </div>
        </div>
      </section>
      <FeaturedProduct />
      <section className="sm:pt-20 pt-5 pb-10">
        <Image
          src={advertisingBanner.src}
          height={advertisingBanner.height}
          width={advertisingBanner.width}
          alt="Advertisement"
        />
      </section>
      <Testimonial />
      <section className="lg:px-32 px-4 border-t py-10">
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10">
          <div className="text-center">
            <p className="flex justify-center items-center mb-3">
              <GiReturnArrow size={30} />
            </p>
            <h3 className="text-xl font-semibold">7-Days Returns</h3>
            <p>Risk-free shopping with easy returns.</p>
          </div>
          <div className="text-center">
            <p className="flex justify-center items-center mb-3">
              <FaShippingFast size={30} />
            </p>
            <h3 className="text-xl font-semibold">Free Shipping</h3>
            <p>No Extra Cost, just the price you see.</p>
          </div>
          <div className="text-center">
            <p className="flex justify-center items-center mb-3">
              <BiSupport size={30} />
            </p>
            <h3 className="text-xl font-semibold">24/7 Support</h3>
            <p>24/7 support, always here just for you</p>
          </div>
          <div className="text-center">
            <p className="flex justify-center items-center mb-3">
              <TbRosetteDiscountFilled size={30} />
            </p>
            <h3 className="text-xl font-semibold">Member Discounts</h3>
            <p>Special offers for our loyal customers</p>
          </div>
        </div>
      </section>
    </>
  );
}
