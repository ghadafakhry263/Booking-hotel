import React from "react";
import { useDispatch } from "react-redux";
import { addBooking } from "../redux/bookingSlice";
import { useNavigate } from "react-router-dom";
import { userDummyData } from "../assets/assets"; 
import { hotelDummyData } from "../assets/assets"; 

const BookNowButton = ({ room ,checkInDate,checkOutDate}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBooking = () => {
    const newBooking = {
      _id: Math.random().toString(36).substr(2, 9),
      user: userDummyData,
      room: room,
      hotel: hotelDummyData,
      checkInDate: new Date(checkInDate).toISOString(),
      checkOutDate: new Date(checkOutDate).toISOString(),
      totalPrice: room.price,
      guests: 1,
      status: "pending",
      paymentMethod: "Stripe",
      isPaid: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0,
    };

    dispatch(addBooking(newBooking));
    navigate("/My-booking");
  };

  return (
    <button
      onClick={handleBooking}
      className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
    >
      Book Now
    </button >
  );
};

export default BookNowButton;
