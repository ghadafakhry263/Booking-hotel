import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, facilityIcons, roomCommonData, roomsDummyData } from "../assets/assets";
import StarIcon from "../Component/StarIcon";
import { userBookingsDummyData } from "../assets/assets";
import BookNowButton from "../Component/BookNowButton";
const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setImage] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [result, setResult] = useState(null);

  const handleCheckAvailability = (e) => {
    e.preventDefault();

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // التحقق من التعارض مع أي حجز موجود
    const isBooked = userBookingsDummyData.some((booking) => {
      const existingCheckIn = new Date(booking.checkInDate);
      const existingCheckOut = new Date(booking.checkOutDate);

      return (
        (checkInDate < existingCheckOut && checkOutDate > existingCheckIn)
      );
    });

    setResult(isBooked ? 'Not Available' : 'Available');
  };

  useEffect(() => {
    const room = roomsDummyData.find((room) => room._id === id);
    room && setRoom(room);
    room && setImage(room.images[0]);
  }, [id]);
  return (
    room && (
      <div className="py-28 md:py-35 px-4 md:px-16 lg:px-26 xl-px-32">
        <div className="flex items-center ">
          <h1 className="text-4xl font-playfair font-bold ">
            {room.hotel.name}
            <span className="text-sm font-light px-4">({room.roomType})</span>
          </h1>
          <p className="text-white text-sm bg-orange-500 p-2 rounded-full">
            20% OFF
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StarIcon />
          <span className="mt-3">200+ review</span>
        </div>
        <div className="gap-2 flex  mt-3">
          <img src={assets.locationIcon} />
          <span className="text-gray-500">{room.hotel.address}</span>
        </div>
        {/* // Image Section */}
        <div className="flex flex-col lg:flex-row gap-5 mt-8">
 <div className="lg:w-1/2 w-full pt-4">
          <img src={mainImage} className="w-full rounded-xl shadow-lg object-cover" />
        </div>
        <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
          {room?.images.length >1 && room.images.map((image, index) => (
            <img
              key={index}
              src={image}
              className={`w-full  rounded-2xl shadow-lg object-cover mb-4 cursor-pointer ${mainImage === image ? "outline-3 outline-orange-500" : ""}`}
              onClick={() => setImage(image)}
            />
          ))}
       
        </div>
       
        </div>
        <div className="flex flex-col lg:flex-row gap-5 mt-8 mb-15 md:justify-between">
          <div className="flex-flex-col">
            <h1 className="font-playfair text-4xl">Experience Luxury Like Never Before</h1>
            <div className="flex flex-wrap gap-2 mt-4">
              {room.amenities.map((item) => (
                <div
                  className="flex  items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg"
                  key={item}
                >
                  <img src={facilityIcons[item]} className="w-4 h-4" />
                  <p className="text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
       <p className="text-2xl">$ {room.pricePerNight}/night </p>
        </div>
        {/* //form */}
            <form onSubmit={handleCheckAvailability} className='bg-white text-gray-500 rounded-lg px-6 py-4 mt-4 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto shadow-2xl justify-between'>
        
        <div>
          <div className='flex items-center gap-2'>
            <svg className="w-4 h-4 text-gray-800" /* SVG content */ />
            <label htmlFor="checkIn">Check in</label>
          </div>
          <input id="checkIn" type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" required/>
        </div>

        <div>
          <div className='flex items-center gap-2'>
            <svg className="w-4 h-4 text-gray-800" /* SVG content */ />
            <label htmlFor="checkOut">Check out</label>
          </div>
          <input id="checkOut" type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" required />
        </div>

        <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
          <label htmlFor="guests">Guests</label>
          <input min={1} max={4} id="guests" type="number" value={guests} onChange={(e) => setGuests(e.target.value)} className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none max-w-16" placeholder="0" />
        </div>

        <button type="submit" className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1'>
          <span>Check Availability</span>
        </button>
      </form>
{result && (
  <>
    <div className="mt-4 px-6 w-full py-3 rounded-md">
      <p className={`text-sm font-semibold ${result === 'Available' ? 'text-green-600' : 'text-red-600'}`}>
        {result === 'Available' ? 'The hotel is available 🎉' : 'The hotel is not available ❌'}
      </p>
    </div>

    {result === 'Available' && (
      <div className="mt-2 px-5">
       <BookNowButton room={room}  
       checkInDate={checkIn}
  checkOutDate={checkOut}/>
      </div>
    )}
  </>
)}


                {/* //common data */}
                <div>
                  {roomCommonData.map((item, index) => (
                    <div className="flex items-center gap-2 mt-10" key={index}>
                      <img src={item.icon} className="w-6 h-6" alt={item.label} />
                    <div className="flex flex-col">
                       <span>{item.title} </span>
                      <span className="text-gray-700"> {item.description}</span>
                    </div>
                     </div>
                  ))}
                </div>
      </div>
    )
  );
};

export default RoomDetails;
