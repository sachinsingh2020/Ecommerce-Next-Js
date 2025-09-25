import Footer from "@/components/Application/Website/Footer";
import Header from "@/components/Application/Website/Header";
import React from "react";
import { Kumbh_Sans } from "next/font/google";

const kumbh = Kumbh_Sans({
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  subsets: ["latin"],
});

const layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
