import { NavLink } from "react-bootstrap"
import Navbar from "./Component/Navbar"
import { Route, Routes, useLocation } from "react-router-dom"
import Home from "./Pages/Home"
import Footer from "./Component/Footer"


function App() {
  // Check if the current path includes "owner"
const isOwnerPath=useLocation().pathname.includes("owner")

  return (
    <>
    {!isOwnerPath &&< Navbar />}
  <div className="min-h-[70vh]">
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </div>
  <Footer></Footer>
    </>
  )
}

export default App
