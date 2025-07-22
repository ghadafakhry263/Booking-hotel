import { createSlice } from "@reduxjs/toolkit";


 const initialState={
    bookings:[]
}
const bookingSlice =createSlice({
name:"booking ",
initialState ,
reducers:{
    addBooking:(state ,action )=>{
       state.bookings.push(action.payload) 
    },
    clearBookings:(state )=>{
       state.bookings=[]
    },
     removeBooking: (state, action) => {
      state.bookings = state.bookings.filter(
        (booking) => booking._id !== action.payload
      );
}

}
}
)
export const { addBooking, clearBookings,removeBooking } = bookingSlice.actions;
export default bookingSlice.reducer;