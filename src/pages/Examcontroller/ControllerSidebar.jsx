
import React from 'react'
import { BiNotification } from 'react-icons/bi'
import { CgAdd, CgNotes } from 'react-icons/cg'
import { GoReport } from 'react-icons/go'
import { MdOutlineManageAccounts, MdOutlineSpaceDashboard } from 'react-icons/md'
import { PiExam } from 'react-icons/pi'
import { NavLink } from 'react-router-dom'
// import { assets } from '../../assets/assets'

const ControllerSidebar = () => {
  return (
    <div className='flex flex-col border-r border-gray-200 min-h-full pt-6 text-gray-600'>
        <NavLink end={true} to='/controller' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 text-white border-r-4 border-blue-800"}`}>
            <MdOutlineSpaceDashboard/>
            <p className='hidden md:inline-block'>Dashboard</p>
        </NavLink>

        <NavLink  to='/controller/create-exam' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 text-white border-r-4 border-blue-800"}`}>
            <CgAdd/>
            <p className='hidden md:inline-block'>Create Exam</p>
        </NavLink>

        <NavLink  to='/controller/manage-teacher' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 text-white border-r-4 border-blue-800"}`}>
            <MdOutlineManageAccounts/>
            <p className='hidden md:inline-block'>Manage Teacher</p>
        </NavLink>

        <NavLink  to='/controller/add-department' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 text-white border-r-4 border-blue-800"}`}>
            <PiExam/>
            <p className='hidden md:inline-block'>Create Department</p>
        </NavLink>

        <NavLink  to='/controller/controllernotification' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 text-white border-r-4 border-blue-800"}`}>
            <BiNotification/>
            <p className='hidden md:inline-block'>Notifications</p>
        </NavLink>
        <NavLink  to='/controller/resultsmanage-' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 text-white border-r-4 border-blue-800"}`}>
            <CgNotes/>
            <p className='hidden md:inline-block'>Manage Result</p>
        </NavLink>
        <NavLink  to='/controller/reports' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 text-white border-r-4 border-blue-800"}`}>
            <GoReport/>
            <p className='hidden md:inline-block'>report&Status</p>
        </NavLink>
    </div>
  )
}

export default ControllerSidebar