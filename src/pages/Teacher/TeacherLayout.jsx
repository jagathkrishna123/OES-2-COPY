import React, { useState, useEffect } from 'react'
// import { assets } from '../../assets/assets'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'


const TeacherLayout = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [teacherName, setTeacherName] = useState('')

    // Get teacher info from localStorage
    useEffect(() => {
        const teacher = JSON.parse(localStorage.getItem('teacher'))
        if (teacher) {
            setTeacherName(teacher.name)
        }
    }, [location.pathname])

    const teacher = JSON.parse(localStorage.getItem('teacher'))

    // Hide sidebar when on StudentEvaluation page
    const hideSidebar = location.pathname.includes('/evaluation/')

    const logout = () => {
        localStorage.removeItem('teacher')
        navigate('/')
    }
  return (
    <>
        <div className='flex items-center justify-between py-2 h-[60px] px-4 sm:px-12 border-b border-gray-200 mt-[0px]'>
                <p className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent text-3xl font-bold">
          OES
        </p>
            <div className='flex gap-3 items-center'>
             <p className="text-md font-medium text-gray-700">
               Welcome, {teacherName}
               {teacher?.subject && (
                 <span className="text-sm text-gray-500 ml-2">
                   ({teacher.subject})
                 </span>
               )}
             </p>
              <button onClick={logout} className='text-sm px-8 py-2 bg-cyan-700 text-white rounded-full cursor-pointer'>Logout</button>
             </div>
        </div>
        <div className='flex h-[calc(100vh-70px)]'>
            {!hideSidebar && <TeacherSidebar/>}
            <div className={`${hideSidebar ? 'w-full' : 'w-full overflow-y-auto'}`}>
            <Outlet/>
            </div>
        </div>
    </>
  )
}

export default TeacherLayout