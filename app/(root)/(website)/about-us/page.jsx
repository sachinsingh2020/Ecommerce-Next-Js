import WebsiteBreadcrumb from "@/components/Application/Website/WebsiteBreadcrumb";
import React from "react";

const breadcrumb = {
  title: "About",
  links: [{ label: "About" }],
};
const AboutUs = () => {
  return (
    <div>
      <WebsiteBreadcrumb props={breadcrumb} />
      <div className="lg:px-40 px-5 py-20">
        <h1 className="text-xl font-semibold mb-3">About Us</h1>
        <p>
          Welcome to E-store, your one-stop destination for quality,
          convenience, and innovation in online shopping.
        </p>
        <p>
          Founded with a mission to redefine the eCommerce experience, we are
          passionate about bringing you a carefully curated selection of
          products that meet your everyday needs—whether it&apos;s fashion,
          electronics, home essentials, beauty, or lifestyle goods. Our goal is
          to deliver not just products, but value, trust, and a seamless
          shopping journey.
        </p>
        <p className="mt-5">What sets us apart is our commitment to:</p>
        <ul className="list-disc ps-10 mt-3">
          <li>
            {" "}
            <b> Customer Satisfaction:</b> Your happiness is our priority. From
            browsing to checkout, we’re here to make your shopping experience
            effortless and enjoyable.
          </li>

          <li>
            {" "}
            <b> Quality & Affordability: </b>We partner directly with trusted
            suppliers and brands to offer high-quality products at competitive
            prices.
          </li>

          <li>
            {" "}
            <b> Fast & Reliable Shipping: </b>We understand the excitement of
            online shopping, so we work hard to ensure your orders arrive on
            time.
          </li>

          <li>
            {" "}
            <b> Secure Shopping: </b>Your data is safe with us. Our platform
            uses cutting-edge encryption and payment security technologies.
          </li>
        </ul>

        <p className="mt-3">
          As a growing brand, we believe in constantly evolving—adding new
          products, improving our services, and listening to what our customers
          want. Whether you&apos;re shopping for yourself or finding the perfect
          gift, we’re here to help you discover something you&apos;ll love.
        </p>
        <p className="mt-3">
          Thank you for choosing E-store. Let&apos;s make shopping smarter,
          simpler, and more enjoyable—together.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
