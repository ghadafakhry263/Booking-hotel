import { NavLink } from "react-bootstrap"
import Navbar from "./Component/Navbar"
import { Route, Routes, useLocation } from "react-router-dom"
import Home from "./Pages/Home"
import Footer from "./Component/Footer"
import Allrooms from "./Component/Allrooms"
import RoomDetails from "./Pages/RoomDetails"
import Booking from "./Pages/Booking"


function App() {
  // Check if the current path includes "owner"
const isOwnerPath=useLocation().pathname.includes("owner")

  return (
    <>
    {!isOwnerPath &&< Navbar />}
  <div className="min-h-[70vh]">
    <Routes>
      <Route path="/" element={<Home />} />
       <Route path="/rooms" element={<Allrooms />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="/My-booking" element={<Booking />} />
        My-booking
    </Routes>
  </div>
  <Footer></Footer>
    </>
  )
}

export default App
