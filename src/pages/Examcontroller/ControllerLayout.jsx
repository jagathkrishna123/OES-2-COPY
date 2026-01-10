


import React from 'react'
// import { assets } from '../../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom'

import ControllerSidebar from './ControllerSidebar'


const ControllerLayout = () => {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('controller')
        navigate('/')
    }
  return (
    <>
        <div className='flex items-center justify-between py-2 h-[60px] px-4 sm:px-12 border-b border-gray-200 mt-[0px]'>
                <p className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent text-3xl font-bold">
          OES
        </p>
            <button onClick={logout} className='text-sm px-8 py-2 bg-cyan-700 text-white rounded-full cursor-pointer'>Logout</button>
        </div>
        <div className='flex h-[calc(100vh-70px)]'>
            <ControllerSidebar/>
            <div className='overflow-y-auto w-full'>
            <Outlet/>
            </div>
        </div>
    </>
  )
}

export default ControllerLayout