import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import React from "react";
import { IoStar } from "react-icons/io5";

const ProductReview = ({ product }) => {
  return (
    <div className="shadow rounded border mb-20">
      <div className="p-3 bg-gray-50 border-b">
        <h2 className="font-semibold text-2xl">Rating & Reviews</h2>
      </div>
      <div className="p-3">
        <div className="flex justify-between flex-wrap items-center">
          <div className="md:w-1/2 w-full md:flex md:gap-10 md:mb-0 mb-5">
            <div className="md:w-[200px] w-full md:mb-0 mb-5">
              <h4 className="text-center text-8xl font-semibold">0.0</h4>
              <div className="flex justify-center gap-2">
                <IoStar />
                <IoStar />
                <IoStar />
                <IoStar />
                <IoStar />
              </div>
              <p className="text-center mt-3">(0 Rating & Reviews)</p>
            </div>
            <div className="md:w-[calc(100%-200px)] flex items-center">
              <div className="w-full">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <p className="w-3">{rating}</p>
                      <IoStar />
                    </div>
                    <Progress value={20} />
                    <span className="text-sm">20</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="md:w-1/2 w-full md:text-end text-center">
            <Button
              type="button"
              variant="outline"
              className={"md:w-fit w-full py-6 px-10"}
            >
              Write Review
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
