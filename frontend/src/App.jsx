import NavBar from '../components/navbar'
import './App.css'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router"
import {Routes, Route,} from "react-router-dom"
import TasksPage from '../pages/tasks'
import CreatePage from '../pages/create'


function App() {
  const nav = useNavigate()

  return (
  <>
  <NavBar/>
  <div className="overflow-hidden ml-[20rem] w-[calc(100vw-20rem)]">
    <div className="bg-slate-700 min-h-screen p-4">
      <div className="flex flex-col justify-evenly items-center mb-4">
        <h1 className="text-white text-4xl font-bold underline">HMCTS TASK MANAGER</h1>
        <button className="w-[200px] bg-green-600 rounded-full mx-8 mt-16 mb-2 p-2 font-bold text-lg border-transparent border-[1px] hover:border-black hover:text-white hover:cursor-pointer self-end"
        onClick={() => nav("/create")}>CREATE TASK + </button>
        <Routes>
          <Route path="/" element={<TasksPage />}/>
          <Route path="/create" element={<CreatePage />}/>
        </Routes>
      </div>
    </div>
  </div>
  </>
)}

export default App