"use client";
import {
  USER_DASHBOARD,
  WEBSITE_HOME,
  WEBSITE_LOGIN,
} from "@/routes/WebsiteRoute";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/assets/images/logo-black.png";
import { IoIosSearch } from "react-icons/io";
import Cart from "./Cart";
import { VscAccount } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import userIcon from "@/public/assets/images/user.png";
import { HiMiniBars3 } from "react-icons/hi2";

const Header = () => {
  const auth = useSelector((store) => store.authStore.auth);
  return (
    <div className="bg-white border-b lg:px-32 px-4">
      <div className="flex justify-between items-center lg:py-5 py-3">
        <Link href={WEBSITE_HOME}>
          <Image
            src={logo}
            width={382}
            height={146}
            alt="loho"
            className="lg:w-32 w-24 "
          />
        </Link>
        <div className="flex justify-between gap-20">
          <nav
            className={`lg:relative lg:w-auto lg:top-0 lg:left-0 lg:p-0 bg-white fixed z-50 top-0`}>
            <ul className="flex justify-between items-center gap-10 px-3">
              <li className="text-gray-600 hover:text-primary hover:font-semibold">
                <Link href={WEBSITE_HOME} className="block py-2">
                  Home
                </Link>
              </li>
              <li className="text-gray-600 hover:text-primary hover:font-semibold">
                <Link href={""} className="block py-2">
                  About
                </Link>
              </li>
              <li className="text-gray-600 hover:text-primary hover:font-semibold">
                <Link href={""} className="block py-2">
                  Shop
                </Link>
              </li>
              <li className="text-gray-600 hover:text-primary hover:font-semibold">
                <Link href={""} className="block py-2">
                  T-shirt
                </Link>
              </li>
              <li className="text-gray-600 hover:text-primary hover:font-semibold">
                <Link href={""} className="block py-2">
                  Hoodies
                </Link>
              </li>
              <li className="text-gray-600 hover:text-primary hover:font-semibold">
                <Link href={""} className="block py-2">
                  Oversized
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex justify-between items-center gap-8">
            <button type="button">
              <IoIosSearch
                className="text-gray-500 hover:text-primary cursor-pointer"
                size={25}
              />
            </button>
            <Cart />
            {!auth ? (
              <Link href={WEBSITE_LOGIN}>
                <VscAccount
                  className="text-gray-500 hover:text-primary cursor-pointer"
                  size={25}
                />
              </Link>
            ) : (
              <Link href={USER_DASHBOARD}>
                <Avatar>
                  <AvatarImage src={auth?.avatar?.url || userIcon.src} />
                </Avatar>
              </Link>
            )}

            <button type="button" className="lg:hidden block">
              <HiMiniBars3
                size={25}
                className="text-gray-500 hover:text-primary"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
