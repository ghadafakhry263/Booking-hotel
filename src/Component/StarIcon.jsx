import React from "react";
import { assets, testimonials } from "../assets/assets";

const StarIcon = ({rating=4}) => {
  return (
    <div>
      <div className="flex items-center gap-1 mt-4">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <img
              src={
                rating > index ? assets.starIconFilled : assets.starIconOutlined
              }
              key={index}
              filled={testimonials.rating > index}
            />
          ))}
      </div>
    </div>
  );
};

export default StarIcon;
