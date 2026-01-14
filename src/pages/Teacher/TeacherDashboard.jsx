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
import {
  FaBook,
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaCalendarCheck,
  FaBell,
  FaChartLine,
  FaGraduationCap,
  FaTachometerAlt
} from 'react-icons/fa'

const TeacherDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalsubjects: 0,
    totalstudents: 0,
    evaluatedpapers: 0,
    pendingevaluation: 0,
    attendance: 0,
    notifications: 0,
  })

  const [teacher, setTeacher] = useState({ id: "", name: "", department: "" })
  const [loading, setLoading] = useState(true)

  const fetchDashboard = async () => {
    try {
      setLoading(true)

      // Load teacher data
      const teacherData = JSON.parse(localStorage.getItem('teacher') || '{}')
      setTeacher(teacherData)

      // Load real data from localStorage
      const addedStudents = JSON.parse(localStorage.getItem('addedStudents') || '[]')

      // Filter students by teacher's department
      const teacherStudents = addedStudents.filter(student => student.department === teacherData.department)

      // Calculate dashboard metrics
      const notifications = JSON.parse(localStorage.getItem('teacherNotifications_' + teacherData.teacherId) || '[]')
      const unreadNotifications = notifications.filter(n => !n.readBy || !n.readBy.includes(teacherData.teacherId))

      setDashboardData({
        totalsubjects: 1, // Could be expanded based on subjects data
        totalstudents: teacherStudents.length,
        evaluatedpapers: 0, // Would need evaluation data
        pendingevaluation: 0, // Would need evaluation data
        attendance: 0, // Would need attendance data
        notifications: unreadNotifications.length,
      })
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboard()
  }, [])

  const statsCards = [
    {
      icon: FaBook,
      title: "Total Subjects",
      value: dashboardData.totalsubjects,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      icon: FaUsers,
      title: "My Students",
      value: dashboardData.totalstudents,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      icon: FaCheckCircle,
      title: "Evaluated Papers",
      value: dashboardData.evaluatedpapers,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      icon: FaClock,
      title: "Pending Evaluation",
      value: dashboardData.pendingevaluation,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600"
    },
    {
      icon: FaCalendarCheck,
      title: "Attendance",
      value: dashboardData.attendance,
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50",
      iconColor: "text-cyan-600"
    },
    {
      icon: FaBell,
      title: "Notifications",
      value: dashboardData.notifications,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      iconColor: "text-red-600"
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 p-6 font-out flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 p-6 font-out">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <FaTachometerAlt className="text-blue-600" />
          Teacher Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back, {teacher.name}! Here's an overview of your teaching activities.
        </p>
      </div>

      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl shadow-lg p-6 mb-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Hello, {teacher.name}!</h2>
            <p className="text-blue-100 mb-4">
              Department: {teacher.department || 'Not assigned'}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <FaGraduationCap />
                <span>{dashboardData.totalstudents} Students</span>
              </div>
              <div className="flex items-center gap-2">
                <FaBell />
                <span>{dashboardData.notifications} New Notifications</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <FaGraduationCap className="text-6xl text-blue-200 opacity-50" />
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statsCards.map((card, index) => {
          const IconComponent = card.icon
          return (
            <div
              key={index}
              className={`${card.bgColor} rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300 cursor-pointer group`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${card.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="text-white text-xl" />
                </div>
                <div className={`text-2xl font-bold ${card.iconColor}`}>
                  {card.value}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {card.title}
              </h3>
              <p className="text-sm text-gray-600">
                {card.title === "My Students" && "Students in your department"}
                {card.title === "Total Subjects" && "Subjects you're teaching"}
                {card.title === "Evaluated Papers" && "Papers you've evaluated"}
                {card.title === "Pending Evaluation" && "Papers awaiting evaluation"}
                {card.title === "Attendance" && "Attendance records"}
                {card.title === "Notifications" && "Unread notifications"}
              </p>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <FaChartLine className="text-green-600" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <FaUsers className="text-blue-600 text-2xl mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Manage Students</p>
            <p className="text-xs text-gray-600">Add, edit, view students</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <FaCheckCircle className="text-green-600 text-2xl mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Evaluate Papers</p>
            <p className="text-xs text-gray-600">Grade student papers</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <FaCalendarCheck className="text-purple-600 text-2xl mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Mark Attendance</p>
            <p className="text-xs text-gray-600">Record student attendance</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <FaBell className="text-orange-600 text-2xl mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Notifications</p>
            <p className="text-xs text-gray-600">View messages</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherDashboard
