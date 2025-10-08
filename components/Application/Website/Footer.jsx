import Image from "next/image";
import React from "react";
import logo from "@/public/assets/images/logo-black.png";
import Link from "next/link";
import { WEBSITE_HOME } from "@/routes/WebsiteRoute";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineMail, MdOutlinePhone } from "react-icons/md";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { TiSocialFacebookCircular } from "react-icons/ti";

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
            <li className="mb-2 text-gray-500">
              <Link href={WEBSITE_HOME}>Login</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-bold uppercase mb-5">Help Center</h4>
          <ul>
            <li className="mb-2 text-gray-500">
              <Link href={""}>Register</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href={""}>Login</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href={""}>My Account</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href={""}>Privacy Policy</Link>
            </li>
            <li className="mb-2 text-gray-500">
              <Link href={""}>Terms & Conditions</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-bold uppercase mb-5">Contact Us</h4>
          <ul>
            <li className="mb-2 text-gray-500 flex gap-2">
              <IoLocationOutline size={20} />
              <span className="text-sm">
                E-Store market Lucknow, India 256320
              </span>
            </li>
            <li className="mb-2 text-gray-500 flex gap-2">
              <MdOutlinePhone size={20} />
              <Link
                href={"tel: +91-7042041636"}
                className="hover:text-primary text-sm">
                +91-7042041636
              </Link>
            </li>
            <li className="mb-2 text-gray-500 flex gap-2">
              <MdOutlineMail size={20} />
              <Link
                href={"mailto:sachin891singh@gmail.com"}
                className="hover:text-primary text-sm">
                sachin891singh@gmail.com
              </Link>
            </li>
          </ul>
          <div className="flex gap-5 mt-5">
            <Link href={""}>
              <AiOutlineYoutube className="text-primary" size={25} />
            </Link>
            <Link href={""}>
              <FaInstagram className="text-primary" size={25} />
            </Link>
            <Link href={""}>
              <FaWhatsapp className="text-primary" size={25} />
            </Link>
            <Link href={""}>
              <TiSocialFacebookCircular className="text-primary" size={25} />
            </Link>
            <Link href={""}>
              <FiTwitter className="text-primary" size={25} />
            </Link>
          </div>
        </div>
      </div>
      <div className="py-5 bg-gray-100">
        <p className="text-center">© 2025 Estore. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
