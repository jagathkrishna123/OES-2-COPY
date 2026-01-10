import React from 'react'
import { BiNotification } from 'react-icons/bi'
import { CgAdd } from 'react-icons/cg'
import { PiExam } from 'react-icons/pi'
import { RxDashboard } from 'react-icons/rx'
import { FaUsers } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
// import { assets } from '../../assets/assets'

const TeacherSidebar = () => {
  return (
    <div className='flex flex-col border-r border-gray-200 min-h-full pt-6 text-gray-400 font-out'>
        <NavLink end={true} to='/teacher' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-primary"}`}>
            <RxDashboard />
            <p className='hidden md:inline-block'>Dashboard</p>
        </NavLink>

        <NavLink  to='/teacher/addstudent' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-primary"}`}>
            <CgAdd/>
            <p className='hidden md:inline-block'>Add Student</p>
        </NavLink>

        <NavLink  to='/teacher/managestudents' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-primary"}`}>
            <FaUsers/>
            <p className='hidden md:inline-block'>Manage Students</p>
        </NavLink>

        {/* <NavLink  to='/teacher/addsubject' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-primary"}`}>
            <CgAdd/>
            <p className='hidden md:inline-block'>Add Subject</p>
        </NavLink> */}

        <NavLink  to='/teacher/evaluate' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-primary"}`}>
            <PiExam/>
            <p className='hidden md:inline-block'>Evaluate Exam</p>
        </NavLink>

        <NavLink  to='/teacher/notification' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-primary"}`}>
            <BiNotification/>
            <p className='hidden md:inline-block'>Notifications</p>
        </NavLink>
    </div>
  )
}

export default TeacherSidebar