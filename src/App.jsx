import { NavLink } from "react-bootstrap"
import Navbar from "./Component/Navbar"
import { Route, Routes, useLocation } from "react-router-dom"
import Home from "./Pages/Home"


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
    </>
  )
}

export default App
