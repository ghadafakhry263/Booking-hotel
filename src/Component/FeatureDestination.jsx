import React from 'react'
import { roomsDummyData } from '../assets/assets'
import HotelCard from './HotelCard'
import { useNavigate } from 'react-router-dom'
const FeatureDestination = () => {
  const navigate = useNavigate();
  return (
  
    <div className='flex flex-col items-center bg-gray-50'>
        <h1 className='font-playfair text-4xl font-bold text-gray-800 mb-6 pt-10'>Featured Destinations</h1>
        <p className='max-w-2xl text-gray-500 text-center pb-5'>Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences</p>
        <div className='flex flex-wrap gap-6 justify-center items-center pt-10'>
            {roomsDummyData.slice(0,4).map((room,index)=>(
                <HotelCard key={room._id} room={room} index={index}/>
            ))}
        </div>
        <button onClick={() => { navigate("/rooms"); scrollTo(0, 0); }} className='px-16 py-2.5 mt-20 mb-10 bg-white  text-black border border-gray-300 rounded-full hover:bg-gray-300 transition-all duration-300'>View All Destinations</button>
    </div>
  )
}

export default FeatureDestination