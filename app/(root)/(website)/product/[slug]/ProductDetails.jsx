"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { WEBSITE_SHOP, WEBSTIE_PRODUCT_DETAILS } from "@/routes/WebsiteRoute";
import Link from "next/link";
import Image from "next/image";
import imgPlaceholder from "@/public/assets/images/img-placeholder.webp";
import { IoStar } from "react-icons/io5";
import { decode } from "entities";

const ProductDetails = ({ product, variant, colors, sizes, reviewCount }) => {
  const [activeThumb, setActiveThumb] = useState();

  useEffect(() => {
    setActiveThumb(variant.media[0].secure_url);
  }, [variant]);

  const handleThumb = (thumbUrl) => {
    setActiveThumb(thumbUrl);
  };

  return (
    <div className="lg:px-32 px-4">
      <div className="my-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={WEBSITE_SHOP}>Product</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={WEBSTIE_PRODUCT_DETAILS(product?.slug)}>
                  {product?.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="md:flex justify-between items-start lg:gap-10 gap-5 mb-20">
        <div className="md:w-1/2 xl:flex xl:justify-center xl:gap-5 md:sticky md:top-0">
          <div className="xl:order-last xl:mb-0 mb-5 xl:w-[calc(100%-144px)]">
            <Image
              src={activeThumb || imgPlaceholder.src}
              width={650}
              height={650}
              alt="product"
              className="border rounded max-w-full"
            />
          </div>
          <div className="flex xl:flex-col items-center xl:gap-5 gap-3 xl:w-36 overflow-auto xl:pb-0 pb-2 max-h-[600px">
            {variant?.media?.map((thumb) => (
              <Image
                key={thumb._id}
                src={thumb?.secure_url || imgPlaceholder.src}
                width={100}
                height={100}
                alt="product thumbnail"
                className={`md:max-w-full max-w-16 rounded cursor-pointer ${
                  thumb.secure_url === activeThumb
                    ? "border-2 border-primary"
                    : "border"
                }`}
                onClick={() => handleThumb(thumb.secure_url)}
              />
            ))}
          </div>
        </div>
        <div className="md:w-1/2 md:mt-0 mt-5">
          <h1 className="text-3xl font-semibold mb-2">{product?.name}</h1>
          <div className="flex items-center gap-1 mb-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <IoStar key={i} />
            ))}
            <span className="text-sm ps-2">({reviewCount} Reviews)</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl font-semibold ">
              {variant.sellingPrice.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
            <span className="text-sm line-through text-gray-500">
              {variant.mrp.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
            <span className="bg-red-500 rounded-2xl px-3 py-1 text-white text-xs ms-5">
              -{variant.discountPercentage}%
            </span>
          </div>
          <div
            className="line-clamp-3"
            dangerouslySetInnerHTML={{ __html: decode(product.description) }}
          ></div>
          <div className="mt-5">
            <p className="mb-2">
              <span className="font-semibold">Color: {variant?.color}</span>
            </p>
            <div className="flex gap-5">
              {colors.map((color) => (
                <Link
                  href={""}
                  key={color}
                  className={`border py-1 px-3 rounded-lg cursor-pointer hover:bg-primary hover:text-white ${
                    color === variant.color ? "bg-primary text-white" : ""
                  }`}
                >
                  {color}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
