import React from "react";
import pageTitle from "@/public/assets/images/page-title.png";
import Link from "next/link";
import { WEBSITE_HOME } from "@/routes/WebsiteRoute";

const WebsiteBreadcrumb = ({ props }) => {
  return (
    <div className="py-10 flex justify-center items-center bg-[url('/assets/images/page-title.png')] bg-cover bg-center">
      <div>
        <h1 className="text-2xl font-semibold mb-2 text-center">
          {props.title}
        </h1>
        <ul className="flex gap-2 justify-center">
          <li>
            <Link href={WEBSITE_HOME} className="font-semibold">
              Home
            </Link>
          </li>
          {props.links.map((item, index) => (
            <li key={index}>
              <span className="me-1">/</span>
              {item.href ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span>{item.label}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WebsiteBreadcrumb;
