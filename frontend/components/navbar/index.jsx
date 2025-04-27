import React from 'react'
import { useNavigate } from "react-router"

const NavBar = () => {
  const nav = useNavigate()

  return (
    <div id="nav" className="absolute sm:w-[16rem] lg:w-[20rem] h-screen bg-navBlack z-10">
        <div className="flex flex-col gap-[2rem] text-2xl text-white font-bold m-[2rem] items-center z-11">
            <p className="hover:underline hover:cursor-pointer" onClick={() => nav("/")}>View All Tasks</p>
            <p className="hover:underline hover:cursor-pointer" onClick={() => nav("/search")}>Search Tasks</p>
        </div> 
    </div>
  )
}

export default NavBar
