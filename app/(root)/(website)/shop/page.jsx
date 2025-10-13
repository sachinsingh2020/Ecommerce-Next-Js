"use client";
import Filter from "@/components/Application/Website/Filter";
import WebsiteBreadcrumb from "@/components/Application/Website/WebsiteBreadcrumb";
import { WEBSITE_SHOP } from "@/routes/WebsiteRoute";
import Sorting from "@/components/Application/Website/Sorting";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useWindowSize from "@/hooks/useWindowSize";

const breadcrumb = {
  title: "Shop",
  links: [{ label: "Shop", href: WEBSITE_SHOP }],
};

export default function ShopPage() {
  const [limit, setLimit] = useState(9);
  const [sorting, setSorting] = useState("default_sorting");
  const [isMobileFilter, setIsMobileFilter] = useState(false);
  const windowSize = useWindowSize();

  return (
    <div>
      <WebsiteBreadcrumb props={breadcrumb} />
      <section className="lg:flex lg:px-32 px-4 my-20">
        {windowSize.width > 1024 ? (
          <div className="w-72 me-4">
            <div className="sticky top-0 bg-gray-50 p-4 rounded">
              <Filter />
            </div>
          </div>
        ) : (
          <Sheet
            open={isMobileFilter}
            onOpenChange={() => setIsMobileFilter(false)}
          >
            <SheetTrigger>Open</SheetTrigger>
            <SheetContent side="left" className={"block"}>
              <SheetHeader className={"border-b"}>
                <SheetTitle>Filter</SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <div className="p-4 overflow-auto h-[calc(100vh-80px)]">
                <Filter />
              </div>
            </SheetContent>
          </Sheet>
        )}

        <div className="lg:w-[calc(100%-18rem)]">
          <Sorting
            limit={limit}
            setLimit={setLimit}
            sorting={sorting}
            setSorting={setSorting}
            mobileFilterOpen={isMobileFilter}
            setMobileFilterOpen={setIsMobileFilter}
          />
        </div>
      </section>
    </div>
  );
}
