import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import usericon from "@/public/assets/images/user.png";
import { IoStar } from "react-icons/io5";

dayjs.extend(relativeTime);

const ReviewList = ({ review }) => {
  return (
    <div className="flex gap-5">
      <div className="w-[60px]">
        <Image
          src={review?.avatar?.url || usericon.src}
          width={55}
          height={55}
          alt="user icon"
          className="rounded-lg"
        />
      </div>
      <div className="w-[calc(100%-100px)]">
        <div>
          <h4 className="text-xl font-semibold">{review?.title}</h4>
          <p className="flex gap-2 items-center">
            <span className="font-medium"> {review?.reviewedBy}</span>-
            <span className="text-gray-500">
              {dayjs(review?.createdAt).fromNow()}
            </span>
            <span className="flex items-center text-xs gap-1">
              ( {review.rating} <IoStar className="text-yellow-500 mb-1" /> )
            </span>
          </p>
          <p className="mt-3 text-gray-600">{review?.review}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
