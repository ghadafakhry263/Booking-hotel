import React, { useState } from "react";
import { assets, facilityIcons, roomsDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import StarIcon from "./StarIcon";

const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
      />
      <span className="text-gray-600">{label}</span>
    </label>
  );
};

const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex items-center gap-2">
      <input type="radio" checked={selected} onChange={() => onChange(label)} />
      <span className="text-gray-600">{label}</span>
    </label>
  );
};

const Allrooms = () => {
  const navigate = useNavigate();
  const [Isopenfilter, setIsOpenFilter] = useState(false);
  const roomTypes = ["Single Bed", "Double Bed", "luxury Room", "Family suite"];

  const priceRange = [
    "0 - $500",
    "$500 - $1000",
    "$1000 - $2000",
    "$2000 - $3000",
  ];
  const sortBy = ["Price: Low to High", "Price: High to Low", "Newest First "];

  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [selectedSortBy, setSelectedSortBy] = useState("");

  // فلترة الغرف بناءً على الفلاتر المحددة
  const filteredRooms = roomsDummyData
    .filter((room) => {
      if (
        selectedRoomTypes.length > 0 &&
        !selectedRoomTypes.includes(room.roomType) // إذا ما كان نوع الغرفة مش موجود  مش هنرجعه والعكس صحيح
      ) {
        return false;
      }

      if (selectedPriceRange.length > 0) {
        const matched = selectedPriceRange.some((range) => {
          // لو السعر بين النطاق المحدد هنعمل 3 خطوات
          // 1- هنشيل علامة الدولار وونقطع عندالشرطه ونحول النص لرقم
          // 2- هنقسم النطاق الى قيمتين min و max
          const [min, max] = range.replace(/\$/g, "").split(" - ").map(Number);
          // 3- هنرجع true لو السعر بين النطاق المحدد
          return room.pricePerNight >= min && room.pricePerNight <= max;
        });
        if (!matched) return false;
      }

      return true;
    })
    .sort((a, b) => {
      // فرز الغرف حستريب السعر أو
      if (selectedSortBy === "Price: Low to High")
        return a.pricePerNight - b.pricePerNight;
      if (selectedSortBy === "Price: High to Low")
        return b.pricePerNight - a.pricePerNight;
      return 0;
    });
  // إذا لم يتم اختيار أي نوع من الفرز، فلن يتم تطبيق أي فرز
  const handleRoomTypeChange = (checked, label) => {
    if (checked) {
      setSelectedRoomTypes([...selectedRoomTypes, label]);
    } else {
      setSelectedRoomTypes(selectedRoomTypes.filter((item) => item !== label));
    }
  };

  const handlePriceRangeChange = (checked, label) => {
    if (checked) {
      setSelectedPriceRange([...selectedPriceRange, label]);
    } else {
      setSelectedPriceRange(
        selectedPriceRange.filter((item) => item !== label)
      );
    }
  };

  const handleSortByChange = (label) => {
    setSelectedSortBy(label); // RadioButton: عنصر واحد فقط
  };

  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between lg:flex-row md:pt-35 md:justify-between pt-28 px-20">
        <div>
          <div className="flex flex-col items-start text-left">
            <h1 className="font-playfair text-4xl ">Hotel Rooms</h1>
            <p className="text-sm  text-gray-500/90 max-w-170  pt-5">
              Take advantage of our limited-time offers and special packages to
              enhance your stay and create unforgettable memories.
            </p>
          </div>
          {filteredRooms.map((room) => (
            <div
              className="flex flex-col md:flex-row gap-5 border-b border-gray-300 pb-5 mb-5"
              key={room._id}
            >
              <img
                onClick={() => navigate(`/rooms/${room._id}`)}
                className="max-h-70 md:w-1/2 rounded-xl  object-cover pb-5 pt-5"
                src={room.images[0]}
                title="View rooms details "
              />
              <div className="md:w-1/2 flex flex-col  gap-2 md:pt-5 ">
                <p className="text-gray-500">{room.hotel.city}</p>
                <p
                  onClick={() => navigate(`/rooms/${room._id}`)}
                  className="text-gray-800 font-playfair text-2xl cursor-pointer"
                >
                  {room.hotel.name}
                </p>
                <div className="flex">
                  <StarIcon />
                  <p className="ml-2 mt-3">200+ reviews</p>
                </div>
                <div className="gap-2 flex text-sm">
                  <img src={assets.locationIcon} />
                  <span className="text-gray-500">{room.hotel.address}</span>
                </div>
                <p>${room.pricePerNight}/night </p>
                <div className="flex flex-wrap gap-4 mt-3 items-center">
                  {room.amenities.map((item) => (
                    <div
                      className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
                      key={item}
                    >
                      <img src={facilityIcons[item]} className="w-4 h-4" />
                      <p className="text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* filter */}
        <div className=" bg-white border border-gray-300 md:w-1/4 w-80  p-5 max-lg:mb-8 min:lg:mt-16">
          <div
            className={`border-b border-gray-300 pb-2 mb-2 flex items-center mt-1 justify-between cursor-pointer ${
              Isopenfilter ? "mb-5" : "mb-2"
            }`}
            onClick={() => setIsOpenFilter(!Isopenfilter)}
          >
            <h1 className=" mt-5 ">Filter </h1>
            {Isopenfilter ? (
              <span className="lg:hidden">Hide</span>
            ) : (
              <span className="lg:hidden">Show</span>
            )}
            <span className="hidden lg:block text-gray-500">Clear</span>
          </div>
          <div
            className={`${
              Isopenfilter ? "h-auto" : "h-0 lg:h-auto"
            } overflow-hidden transition-all duration-700 ease-in-out`}
          >
            <div className="pt-5 px-5">
              <p className="font-medium text-gray-800 pb-2">Popualr filter</p>
              {roomTypes.map((room, index) => (
                <CheckBox
                  key={index}
                  label={room}
                  selected={selectedRoomTypes.includes(room)}
                  onChange={handleRoomTypeChange}
                />
              ))}
            </div>
            <div className="pt-5 px-5">
              <p className="font-medium text-gray-700 pb-2">Price range </p>
              {priceRange.map((range, index) => (
                <CheckBox
                  key={index}
                  label={range}
                  selected={selectedPriceRange.includes(range)}
                  onChange={handlePriceRangeChange}
                />
              ))}
            </div>
            <div className="pt-5 px-5">
              <p className="font-medium text-gray-800 pb-2">Sort by </p>
              {sortBy.map((option, index) => (
                <RadioButton
                  key={index}
                  label={option}
                  selected={selectedSortBy === option}
                  onChange={handleSortByChange}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Allrooms;
