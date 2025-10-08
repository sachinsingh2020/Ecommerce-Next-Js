import Image from "next/image";
import React from "react";
import logo from "@/public/assets/images/logo-black.png";
import Link from "next/link";
import { WEBSITE_HOME } from "@/routes/WebsiteRoute";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-10 py-10 lg:px-32 px-4">
        <div className="lg:col-span-1 md:col-span-2 col-span-1">
          <Image
            src={logo}
            width={382}
            height={146}
            alt="loho"
            className="w-36 mb-2 "
          />
          <p className="text-gray-500 text-sm">
            E-Store is your trusted destination for quality and convenience.
            From fashion to essentials, we bring everything you need right to
            your doorstep. Shop smart, live better -- only at E-Store
          </p>
        </div>

        <div>
          <h4 className="text-xl font-bold uppercase mb-5">Categories</h4>
          <ul>
            <li className="mb-2 text-gray-500">
              <Link href={""}>T-shirt</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href={""}>Hoodies</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href={""}>Oversized</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href={""}>Full Sleeve</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href={""}>Polo</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-bold uppercase mb-5">Usefull Links</h4>
          <ul>
            <li className="mb-2 text-gray-500">
              <Link href={WEBSITE_HOME}>Home</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href={WEBSITE_HOME}>Shop</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href={WEBSITE_HOME}>About</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href={WEBSITE_HOME}>Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
