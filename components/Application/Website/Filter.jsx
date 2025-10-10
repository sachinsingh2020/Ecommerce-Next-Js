"use client";
import useFetch from "@/hooks/useFetch";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

const Filter = () => {
  const { data: categoryData } = useFetch("/api/category/get-category");
  const { data: colorData } = useFetch("/api/product-variant/colors");
  const { data: sizeData } = useFetch("/api/product-variant/sizes");

  console.log(sizeData);

  return (
    <div>
      <Accordion type="multiple" defaultValue={["1", "2", "3", "4"]}>
        <AccordionItem value="1">
          <AccordionTrigger
            className={"uppercase font-semibold hover:no-underline"}
          >
            Category
          </AccordionTrigger>
          <AccordionContent>
            <div className="max-h-48 overflow-auto">
              <ul>
                {categoryData &&
                  categoryData.success &&
                  categoryData.data.map((category) => (
                    <li key={category._id} className="mb-3">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <Checkbox />
                        <span>{category.name}</span>
                      </label>
                    </li>
                  ))}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionTrigger
            className={"uppercase font-semibold hover:no-underline"}
          >
            Color
          </AccordionTrigger>
          <AccordionContent>
            <div className="max-h-48 overflow-auto">
              <ul>
                {colorData &&
                  colorData.success &&
                  colorData.data.map((color) => (
                    <li key={color} className="mb-3">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <Checkbox />
                        <span>{color}</span>
                      </label>
                    </li>
                  ))}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="3">
          <AccordionTrigger
            className={"uppercase font-semibold hover:no-underline"}
          >
            Size
          </AccordionTrigger>
          <AccordionContent>
            <div className="max-h-48 overflow-auto">
              <ul>
                {sizeData &&
                  sizeData.success &&
                  sizeData.data.map((size) => (
                    <li key={size} className="mb-3">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <Checkbox />
                        <span>{size}</span>
                      </label>
                    </li>
                  ))}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Filter;
