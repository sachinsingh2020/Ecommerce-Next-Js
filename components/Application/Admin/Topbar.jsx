"use client";
import React, { useEffect, useState } from "react";
import ThemeSwitch from "./ThemeSwitch";
import UserDropdown from "./UserDropdown";
import { RiMenu4Fill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

const Topbar = () => {
  const { toggleSidebar } = useSidebar();

  const [padding, setPadding] = useState({
    paddingLeft: "1rem",
    paddingRight: "1rem",
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setPadding({ paddingLeft: "18rem", paddingRight: "2rem" }); // ps-72 pe-8
      } else {
        setPadding({ paddingLeft: "1rem", paddingRight: "1rem" }); // ps-0 pe-4
      }
    };

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={padding}
      className="fixed border h-14 w-full top-0 left-0 z-30 
      flex justify-between items-center 
      bg-white dark:bg-card px-5">
      <div className="">search component</div>
      <div className="flex items-center gap-2">
        <ThemeSwitch />
        <UserDropdown />
        <Button
          onClick={toggleSidebar}
          type="button"
          size={"icon"}
          className="ms-2 md:hidden">
          <RiMenu4Fill />
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
