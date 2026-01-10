// import React, { useEffect, useState } from 'react'
// import { teacherDashboard_data } from '../../constants/constants'

// const TeacherDashboard = () => {

//     const [dashboardData, setDashboardData] = useState({
//     totalsubjects: 0,
//     totalstudents:0,
//     evaluatedpapers:0,
//     pendingevaluation: 0,
//     attendence:0,
//     notifications:0,
//   })
 
//     const fetchDashboard = async () => {
//     setDashboardData(teacherDashboard_data)
//   }

//    useEffect(() => {
//     fetchDashboard()
//   },[])

//   return (
//     <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
//         <div className='flex flex-wrap gap-4'>
//             <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
//                 {/* <img src={assets.dashboard_icon_1} alt="" /> */}
//                 <div>
//                   <p className='text-xl font-semibold text-gray-600'>{dashboardData.totalevents}</p>
//                   <p className='text-gray-400 font-light'>Total subjects</p>
//                 </div>
//             </div>

//             <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
//                 {/* <img src={assets.dashboard_icon_2} alt="" /> */}
//                 <div>
//                   <p className='text-xl font-semibold text-gray-600'>{dashboardData.totalstudents}</p>
//                   <p className='text-gray-400 font-light'>Total students</p>
//                 </div>
//             </div>

//             <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
//                 {/* <img src={assets.dashboard_icon_3} alt="" /> */}
//                 <div>
//                   <p className='text-xl font-semibold text-gray-600'>{dashboardData.evaluatedpapers}</p>
//                   <p className='text-gray-400 font-light'>Evaluated papers</p>
//                 </div>
//             </div>

//             <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
//                 {/* <img src={assets.dashboard_icon_3} alt="" /> */}
//                 <div>
//                   <p className='text-xl font-semibold text-gray-600'>{dashboardData.pendingevaluation}</p>
//                   <p className='text-gray-400 font-light'>Pending evaluation</p>
//                 </div>
//             </div>

//             <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
//                 {/* <img src={assets.dashboard_icon_3} alt="" /> */}
//                 <div>
//                   <p className='text-xl font-semibold text-gray-600'>{dashboardData.attendence}</p>
//                   <p className='text-gray-400 font-light'>Attndnce</p>
//                 </div>
//             </div>

//             <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
//                 {/* <img src={assets.dashboard_icon_3} alt="" /> */}
//                 <div>
//                   <p className='text-xl font-semibold text-gray-600'>{dashboardData.notifications}</p>
//                   <p className='text-gray-400 font-light'>Notifications</p>
//                 </div>
//             </div>
//         </div>

//         <div>
//           {/* ....heading...... */}
//             <div className='flex items-center gap-3 m-4 mt-6 text-gray-600'>
//               {/* <img src={assets.dashboard_icon_4} alt="" /> */}
//               <p>Latest Blogs</p>
//             </div>
//           {/* ....Table...... */}
//             <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
//               <table className='w-full text-sm text-gray-500'>
//                 <thead className='text-xs text-gray-600 text-left uppercase'>
//                   <tr>
//                     <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
//                     <th scope='col' className='px-2 py-4'>Blog Title</th>
//                     <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
//                     <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
//                     <th scope='col' className='px-2 py-4'>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {/* {dashboardData.recentBlogs.map((blog, index)=> {
//                     return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index + 1}/>
//                   })} */}
//                 </tbody>
//               </table>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default TeacherDashboard

import React, { useEffect, useState } from 'react'
import { teacherDashboard_data } from '../../constants/constants'

const TeacherDashboard = () => {

  const [dashboardData, setDashboardData] = useState({
    totalsubjects: 0,
    totalstudents: 0,
    evaluatedpapers: 0,
    pendingevaluation: 0,
    attendance: 0,
    notifications: 0,
  })
 
  const fetchDashboard = async () => {
    setDashboardData(teacherDashboard_data)
  }

  useEffect(() => {
    fetchDashboard()
  },[])

  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
      
      {/* Top Dashboard Cards */}
      <div className='flex flex-wrap gap-4'>
        
        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.totalsubjects}</p>
            <p className='text-gray-400 font-light'>Total subjects</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.totalstudents}</p>
            <p className='text-gray-400 font-light'>Total students</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.evaluatedpapers}</p>
            <p className='text-gray-400 font-light'>Evaluated papers</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.pendingevaluation}</p>
            <p className='text-gray-400 font-light'>Pending evaluation</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.attendance}</p>
            <p className='text-gray-400 font-light'>Attendance</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.notifications}</p>
            <p className='text-gray-400 font-light'>Notifications</p>
          </div>
        </div>

      </div>

      {/* Latest Blogs Section */}
      

    </div>
  )
}

export default TeacherDashboard
