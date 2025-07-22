import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeBooking } from "../redux/bookingSlice";
import { assets } from "../assets/assets";

const Booking = () => {
  const bookings = useSelector((state) => state.booking.bookings);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeBooking(id));
  };
  return (
    <div className="py-10 px-4 md:px-16 lg:px-26 xl:px-32 mt-15">
      <h1 className="text-4xl font-playfair font-bold mb-4 text-start">
        My Bookings
      </h1>

      <p className="text-gray-600 text-start max-w-3xl mb-8">
        Welcome to our Booking Page – your gateway to unforgettable stays!
        Easily browse available rooms, select your preferred dates and secure
        your spot now.
      </p>

      <div className="hidden md:flex justify-between items-center border-b border-gray-300 pb-3 text-gray-600 font-semibold uppercase tracking-wide text-sm">
        <div className="w-1/3">Hotel</div>
        <div className="w-1/3 text-center">Date & Timing</div>
        <div className="w-1/3 text-end">Payment</div>
      </div>

      <div className="mt-4 space-y-6">
        {bookings.length === 0 ? (
          <p className="text-gray-500 py-10 text-center text-lg">
            No bookings yet.
          </p>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="flex flex-col  md:flex-row justify-center md:justify-between items-center md:items-center gap-6 border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              {/* Hotel Section */}
              <div className="flex items-center gap-4 w-full md:w-1/3">
                <img
                  className="w-32 h-24 object-cover rounded-lg border"
                  src={booking.room.images[0]}
                  alt={booking.room.name}
                />
                <div>
                  <h2 className="font-semibold text-lg">
                    {booking.hotel.name}
                  </h2>
                  <div className="gap-2 flex text-sm">
                    <img src={assets.locationIcon} />
                    <span className="text-gray-500">{booking.hotel.address}</span>
                  </div>
                </div>
              </div>

              {/* Date Section */}
              <div className="w-full md:w-1/3 text-center">
                <p className="text-sm">
                  <span className="font-medium">Check-in:</span>{" "}
                  {new Date(booking.checkInDate).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Check-out:</span>{" "}
                  {new Date(booking.checkOutDate).toLocaleDateString()}
                </p>
              </div>

              {/* Payment Section */}
              <div className="w-full md:w-1/3 text-end space-y-1">
                <p
                  className={`font-semibold capitalize ${
                    booking.status === "pending"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {booking.status}
                </p>
                <p className="text-sm text-gray-500">
                  Paid: {booking.isPaid ? "Yes" : "No"}
                </p>
                <p className="text-sm text-gray-500">
                  Total: ${booking.totalPrice}
                </p>
                {!booking.isPaid && (
                  <button
                    type="button"
                    className="mt-2 inline-block rounded-full border border-gray-600 text-sm px-4 py-1.5 text-gray-700 hover:bg-gray-100 transition"
                  >
                    Pay Now
                  </button>
                )}
              </div>

              {/* Clear Button */}
              <div className="w-full md:w-auto text-end md:ml-4 mt-4 md:mt-0">
                <button
                  onClick={() => handleRemove(booking._id)}
                  type="button"
                  className="rounded-md bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm transition"
                >
                  Clear
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Booking;
