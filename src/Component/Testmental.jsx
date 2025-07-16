import React from "react";
import { testimonials } from "../assets/assets";
import StarIcon from "./StarIcon";

const Testmental = () => {
  return (
    <div className="flex flex-col items-center bg-gray-50 pt-5 ">
      <h1 className="font-playfair text-4xl font-bold text-gray-800 mb-6 pt-10">
        What Our Guests Say
      </h1>
      <p className="max-w-2xl text-gray-500 text-center pb-10">
        Discover why discerning travelers consistently choose QuickStay for
        their exclusive and luxurious accommodations around the world.
      </p>
      {/* // Testimonials Section */}

      <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 pt-5 pb-10">
        <div className="flex flex-col justify-center items-center text-center"></div>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-5 mb-10">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-xl shadow max-w-xs"
            >
              <div className="flex items-center gap-3">
                <img
                  className="w-12 h-12 rounded-full"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <div>
                  <p className="font-playfair text-xl">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.address}</p>
                </div>
              </div>
              <StarIcon />
              <p className="text-gray-500 max-w-90 mt-4">
                "{testimonial.review}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testmental;
