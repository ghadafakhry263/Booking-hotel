import React from 'react';
import { assets, exclusiveOffers } from '../assets/assets';

const ExclusiveOffers = () => {
  return (
    <>
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between pt-20 pb-20 px-20">
        <div className="flex flex-col justify-center items-start">
          <h1 className="font-playfair text-4xl font-bold text-gray-800 mb-6 pt-10">Exclusive Offers</h1>
          <p className="max-w-2xl text-gray-500 pb-5">
            Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
          </p>
        </div>
        <div className="pt-20">
          <button className="group flex items-center gap-2 px-8 py-3 transition-all duration-300">
            View All Offers
            <img src={assets.arrowIcon} alt="arrow" className="inline-block ml-2" />
          </button>
        </div>
      </div>

      {/* Offers Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-20">
        {exclusiveOffers.map((item) => (
          <div
            className="group relative flex w-full items-start justify-between bg-cover bg-center bg-no-repeat rounded-xl overflow-hidden"
            key={item.id}
            style={{
              backgroundImage: `url(${item.image})`,
              height: '300px',
            }}
          >
            <p className="text-black absolute top-4 left-4 px-3 py-1 rounded-full bg-white shadow">
              {item.priceOff}% OFF
            </p>
            <div className="p-6 pt-15   rounded-lg">
              <p className="font-playfair text-2xl font-bold text-white ">{item.title}</p>
              <p className="font-playfair text-xl font-bold text-white mt-2">{item.description}</p>
             <p className="font-playfair text-sm font-bold text-gray-300 mt-2"> expire :{item.expiryDate}</p>
             <button className="group flex items-center gap-2 text-white py-3 transition-all duration-300">
            View All Offers
            <img src={assets.arrowIcon} alt="arrow" className=" invert inline-block ml-2" />
          </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ExclusiveOffers;
