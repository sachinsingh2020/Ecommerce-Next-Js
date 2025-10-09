import FeaturedProduct from "@/components/Application/Website/FeaturedProduct";
import MainSlider from "@/components/Application/Website/MainSlider";
import banner1 from "@/public/assets/images/banner1.png";
import banner2 from "@/public/assets/images/banner2.png";
import Image from "next/image";
import Link from "next/link";

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
    </>
  );
}
